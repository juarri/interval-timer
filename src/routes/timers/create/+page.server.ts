import type { PageServerLoad } from './$types';

import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { intervalTimerFormSchema } from '$lib/components/form/intervalTimer';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(intervalTimerFormSchema));

	return {
		form
	};
};
