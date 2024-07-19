import type { RequestEvent } from '@sveltejs/kit';
import { OAuth2RequestError } from 'arctic';

import { google, lucia } from '$lib/server/auth';
import { GoogleProvider } from '$lib/server/db/data/oauthProvider';
import type { User } from '$lib/server/db/schema';
import { upsertUser } from '$lib/server/db/data/user';

async function handleGoogleAuth(code: string, storedCodeVerifier: string): Promise<User> {
	const tokens = await google.validateAuthorizationCode(code, storedCodeVerifier);
	const googleProvider = new GoogleProvider();
	const user = await upsertUser(googleProvider, tokens.accessToken);

	return user;
}

async function createAndSetSession(event: RequestEvent, user: User): Promise<void> {
	const session = await lucia.createSession(user.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	event.cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	});
}

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');

	if (code === null) {
		throw new Error('Missing code parameter');
	}

	const storedCodeVerifier = event.cookies.get('code_verifier');

	if (storedCodeVerifier === undefined) {
		throw new Error('Missing storedCodeVerifier parameter');
	}

	try {
		const user = await handleGoogleAuth(code, storedCodeVerifier);
		await createAndSetSession(event, user);

		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	} catch (e) {
		const status = e instanceof OAuth2RequestError ? 400 : 500;
		return new Response(JSON.stringify(e), { status });
	}
}
