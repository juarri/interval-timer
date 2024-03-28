import { fail, type Actions, redirect } from '@sveltejs/kit';
import {
	updateIntervalTimer,
	deleteIntervalTimer,
	intervalTimerUpdateUpdatedAt
} from '$lib/server/db/data/intervalTimer';

import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { intervalTimerFormSchema } from '$lib/components/form/intervalTimer';
import { durationToSeconds } from '$lib/schemas/duration';

export const actions = {
	update: async (event) => {
		const id = event.params.id;

		if (!id) {
			return fail(400, { missing: true });
		}

		const user = event.locals.user;

		if (!user) {
			return fail(401, { missing: true });
		}

		const form = await superValidate(event.request, zod(intervalTimerFormSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const updatedIntervalTimer = await updateIntervalTimer(id, user.id, {
			title: form.data.title,
			description: form.data.description,
			preparationTime: durationToSeconds(form.data.preparationTime),
			goTime: durationToSeconds(form.data.goTime),
			stopTime: durationToSeconds(form.data.stopTime),
			cooldownTime: durationToSeconds(form.data.cooldownTime),
			intervals: form.data.intervals
		});

		intervalTimerUpdateUpdatedAt(updatedIntervalTimer.id, user.id);
	},
	delete: async (event) => {
		const user = event.locals.user;

		if (!user) {
			return fail(401, { missing: true });
		}

		const id = event.params.id;

		if (!id) {
			return fail(400, { missing: true });
		}

		const form = await superValidate(event.request, zod(intervalTimerFormSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		await deleteIntervalTimer(id, user.id);

		redirect(300, `/${user.email}`);
	}
} satisfies Actions;
