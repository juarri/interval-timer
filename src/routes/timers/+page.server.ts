import type { PageServerLoad } from './$types';
import { fail, type Actions } from '@sveltejs/kit';
import {
	getIntervalTimersByUserId,
	createIntervalTimer,
	updateIntervalTimer,
	deleteIntervalTimer,
	intervalTimerUpdateUpdatedAt
} from '$lib/server/db/data/intervalTimer';

import * as intervalTimer from '$lib/server/db/data/intervalTimer';

import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { intervalTimerFormSchema } from '$lib/components/form/intervalTimer';
import { durationToSeconds } from '$lib/schemas/duration';

import { generateId } from 'lucia';

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;

	if (!user) {
		return fail(401, { missing: true });
	}

	const intervalTimers = getIntervalTimersByUserId(user.id);

	return {
		user,
		intervalTimers
	};
};

export const actions = {
	createIntervalTimer: async (event) => {
		const user = event.locals.user;

		if (!user) {
			return fail(401, { missing: true });
		}

		const form = await superValidate(event.request, zod(intervalTimerFormSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		await createIntervalTimer({
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

		return message(form, 'Form posted successfully!');
	},
	updateIntervalTimer: async (event) => {
		const id = event.url.searchParams.get('id');

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

		await updateIntervalTimer(id, user.id, {
			title: form.data.title,
			description: form.data.description,
			preparationTime: durationToSeconds(form.data.preparationTime),
			goTime: durationToSeconds(form.data.goTime),
			stopTime: durationToSeconds(form.data.stopTime),
			cooldownTime: durationToSeconds(form.data.cooldownTime),
			intervals: form.data.intervals
		});

		intervalTimer.intervalTimerUpdateUpdatedAt(id, user.id);

		return message(form, 'Form posted successfully!');
	},
	deleteIntervalTimer: async (event) => {
		const user = event.locals.user;

		if (!user) {
			return fail(401, { missing: true });
		}

		const id = event.url.searchParams.get('id');

		if (!id) {
			return fail(400, { missing: true });
		}

		const form = await superValidate(event.request, zod(intervalTimerFormSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await deleteIntervalTimer(id, user.id);
			return message(form, 'Form posted successfully!');
		} catch (e) {
			return fail(500, { error: e });
		}
	}
} satisfies Actions;
