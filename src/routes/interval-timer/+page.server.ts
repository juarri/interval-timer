import { fail, type Actions, redirect } from '@sveltejs/kit';
import { createIntervalTimer } from '$lib/server/db/data/intervalTimer';

import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { intervalTimerFormSchema } from '$lib/components/form/intervalTimer';
import { durationToSeconds } from '$lib/schemas/duration';

import { generateId } from 'lucia';

export const actions = {
	create: async (event) => {
		const user = event.locals.user;

		if (!user) {
			return fail(401, { missing: true });
		}

		const form = await superValidate(event.request, zod(intervalTimerFormSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const createdInterval = await createIntervalTimer({
			id: generateId(20),
			userId: user.id,
			title: form.data.title,
			description: form.data.description ?? '',
			preparationTime: durationToSeconds(form.data.preparationTime),
			goTime: durationToSeconds(form.data.goTime),
			stopTime: durationToSeconds(form.data.stopTime),
			cooldownTime: durationToSeconds(form.data.cooldownTime),
			intervals: form.data.intervals
		});

		redirect(300, `/${user.email}/${createdInterval.id}`);
	}
} satisfies Actions;
