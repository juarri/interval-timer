import type { OAuthProvider } from './oauthProvider';
import { userTable } from '../schema';
import { db } from '..';
import { upsertDashboard } from './dashboard';
import { sql } from 'drizzle-orm';

export async function upsertUser(provider: OAuthProvider, token: string) {
	const providerUser = await provider.getUserData(token);

	const user = await db
		.insert(userTable)
		.values(providerUser)
		.onConflictDoUpdate({
			target: userTable.providerId,
			set: { ...providerUser, id: sql`${userTable.id}` }
		})
		.returning();

	await upsertDashboard(user[0].id);

	return user[0];
}
