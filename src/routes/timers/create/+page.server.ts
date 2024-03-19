import { fail } from '@sveltejs/kit';
import type { Actions, Load } from '@sveltejs/kit';

import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { generateId } from 'lucia';
import { postIntervalTimer } from '$lib/server/db/data/intervalTimers';
import { durationToSeconds } from '$lib/schemas/duration';
import { formSchema } from './formSchema';

export const load: Load = async () => {
	const form = await superValidate(zod(formSchema));

	return { form };
};

export const actions: Actions = {
	default: async (event) => {
		const user = event.locals.user;

		if (!user) {
			return fail(401, {
				message: 'Unauthorized'
			});
		}

		const form = await superValidate(event, zod(formSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const intervalTimer = await postIntervalTimer({
			userId: user.id,
			title: form.data.title,
			preparationTime: durationToSeconds(form.data.preparationTime),
			goTime: durationToSeconds(form.data.goTime),
			stopTime: durationToSeconds(form.data.stopTime),
			cooldownTime: durationToSeconds(form.data.cooldownTime),
			intervals: form.data.intervals
		});

		return {
			form,
			intervalTimer
		};
	}
};
