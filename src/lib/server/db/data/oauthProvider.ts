import { generateId } from 'lucia';
import type { User } from '../schema';

export interface OAuthProvider {
	getUserData(token: string): Promise<User>;
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

export class GoogleProvider implements OAuthProvider {
	async getUserData(token: string): Promise<User> {
		const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
			headers: { Authorization: `Bearer ${token}` }
		});

		if (!response.ok) {
			throw new Error('Failed to fetch user data');
		}

		const googleUser: GoogleUser = await response.json();

		return {
			id: generateId(20),
			provider: 'google',
			providerId: googleUser.sub,
			email: googleUser.email,
			firstName: googleUser.given_name,
			lastName: googleUser.family_name,
			picture: googleUser.picture
		};
	}
}
