import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { intervalTimerTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;

	if (!user) {
		return {
			status: 401,
			error: new Error('Unauthorized')
		};
	}

	const intervalTimers = await db.query.intervalTimerTable.findMany({
		where: eq(intervalTimerTable.userId, user.id)
	});

	return {
		user,
		intervalTimers
	};
};
