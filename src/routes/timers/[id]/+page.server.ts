import type { PageServerLoad } from './$types';

import { getIntervalTimerById } from '$lib/server/db/data/intervalTimer';

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;
	if (!user) {
		return {
			status: 401,
			error: new Error('Unauthorized')
		};
	}

	const routeId = event.params.id;
	const intervalTimer = await getIntervalTimerById(routeId);
	if (!intervalTimer) {
		return {
			status: 404,
			error: new Error('Interval timer not found')
		};
	}

	if (intervalTimer.userId !== user.id) {
		return {
			status: 403,
			error: new Error('Forbidden')
		};
	}

	return {
		intervalTimer
	};
};
