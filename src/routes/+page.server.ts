import type { PageServerLoad } from './$types';

import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { intervalTimerFormSchema } from '$lib/components/form/intervalTimer';
import { getIntervalTimersByUserId } from '$lib/server/db/data/intervalTimer';

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;
	const form = await superValidate(zod(intervalTimerFormSchema));

	if (user) {
		const intervalTimers = await getIntervalTimersByUserId(user.id);

		return {
			intervalTimers,
			form
		};
	}

	return {
		intervalTimers: [],
		form
	};
};
