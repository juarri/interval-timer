import { google, lucia } from '$lib/server/auth';
import { OAuth2RequestError } from 'arctic';
import type { RequestEvent } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { dashboardTable, userTable } from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';
import { generateId } from 'lucia';

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');

	const storedState = event.cookies.get('state');
	const storedCodeVerifier = event.cookies.get('code_verifier');

	if (!code || !storedState || !storedCodeVerifier || state !== storedState) {
		// 400
		throw new Error('Invalid request');
	}

	if (!code || !storedState || !storedCodeVerifier || state !== storedState) {
		// 400
		throw new Error('Invalid request');
	}

	try {
		const tokens = await google.validateAuthorizationCode(code, storedCodeVerifier);
		const response = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const googleUser = (await response.json()) as GoogleUser;

		const existingUser = await db.query.userTable.findFirst({
			where: and(eq(userTable.provider, 'google'), eq(userTable.providerId, googleUser.sub))
		});

		if (existingUser) {
			await db
				.update(userTable)
				.set({
					email: googleUser.email,
					firstName: googleUser.given_name,
					lastName: googleUser.family_name,
					picture: googleUser.picture
				})
				.where(eq(userTable.id, existingUser.id))
				.returning();

			const session = await lucia.createSession(existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		} else {
			const userId = generateId(40);
			await db.insert(userTable).values({
				id: userId,
				provider: 'google',
				providerId: googleUser.sub,
				email: googleUser.email,
				firstName: googleUser.given_name,
				lastName: googleUser.family_name,
				picture: googleUser.picture
			});

			await db.insert(dashboardTable).values({
				id: generateId(20),
				userId: userId,
				sortBy: 'activity',
				view: 'grid'
			});

			const session = await lucia.createSession(userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		}
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	} catch (e) {
		// the specific error message depends on the provider
		if (e instanceof OAuth2RequestError) {
			// invalid code
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
}

type GoogleUser = {
	sub: string;
	name: string;
	given_name: string;
	family_name: string;
	picture: string;
	email: string;
	email_verified: boolean;
	locale: string;
};
