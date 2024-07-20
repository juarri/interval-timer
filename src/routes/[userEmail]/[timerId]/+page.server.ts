import type { PageServerLoad } from './$types';

import { error } from '@sveltejs/kit';

import {
	getIntervalTimerById,
	intervalTimerUpdateAccessedAt
} from '$lib/server/db/data/intervalTimer';

import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { intervalTimerFormSchema as zIntervalTimerFormSchema } from '$lib/components/form/intervalTimer';

export const load: PageServerLoad = async (event) => {
	const intervalTimerFormSchema = await superValidate(zod(zIntervalTimerFormSchema));

	const user = event.locals.user;

	const routeId = event.params.timerId;
	const intervalTimer = await getIntervalTimerById(routeId);

	if (!intervalTimer) {
		return error(404, 'Interval timer not found');
	}

	if (intervalTimer.userId !== user?.id) {
		return error(403, 'Forbidden');
	}

	intervalTimerUpdateAccessedAt(routeId, user.id);

	return {
		intervalTimerFormSchema,
		intervalTimer
	};
};
