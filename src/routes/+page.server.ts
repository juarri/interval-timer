import type { PageServerLoad } from './$types';

import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;

	if (user) {
		throw redirect(307, `/${user.email}`);
	}
};
