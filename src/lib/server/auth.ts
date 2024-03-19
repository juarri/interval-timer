import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
// import { redirect } from '@sveltejs/kit';
import { Google } from 'arctic';
import { Lucia } from 'lucia';
import { db } from './db';
import { sessionTable, userTable } from './db/schema';

const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

const baseUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: 'http://localhost:5173';

const redirectUrl = `${baseUrl}/auth/callback/google`;

export const google = new Google(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, redirectUrl);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === 'production'
		}
	},
	getUserAttributes: (data) => {
		return {
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			picture: data.picture
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			firstName: string;
			lastName: string;
			email: string;
			picture: string;
		};
	}
}

// export function ensureAdmin(locals: App.Locals) {
// 	if (!locals.user || !locals.session) {
// 		redirect(303, '/auth/login');
// 	}
//
// 	if (!locals.user.isAdmin) {
// 		redirect(303, '/');
// 	}
// }
