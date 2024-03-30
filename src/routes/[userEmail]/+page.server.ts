import type { PageServerLoad } from './$types';

import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { intervalTimerFormSchema as zIntervalTimerFormSchema } from '$lib/components/form/intervalTimer';
import { getIntervalTimersByUserId } from '$lib/server/db/data/intervalTimer';
import {
	getDashboard,
	updateDashboardViewBy,
	updateDashboardSortBy
} from '$lib/server/db/data/dashboard';

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;
	const intervalTimerFormSchema = await superValidate(zod(zIntervalTimerFormSchema));

	const view = event.url.searchParams.get('view');
	const sortBy = event.url.searchParams.get('sortBy');
	const query = event.url.searchParams.get('query') || '';

	if (user) {
		if (view === 'grid' || view === 'list') {
			updateDashboardViewBy(user.id, view);
		}

		if (sortBy === 'title' || sortBy === 'accessed' || sortBy === 'updated') {
			updateDashboardSortBy(user.id, sortBy);
		}

		const dashboard = await getDashboard(user.id);

		const intervalTimers = await getIntervalTimersByUserId(user.id, {
			sortBy: dashboard?.sortBy,
			query
		});

		return {
			dashboard,
			intervalTimers,
			intervalTimerFormSchema
		};
	}
};
