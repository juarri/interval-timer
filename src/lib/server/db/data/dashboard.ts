import { db } from '../index';

import { eq } from 'drizzle-orm';
import { dashboardTable } from '../schema';

export const getDashboard = async (userId: string) => {
	return db.query.dashboardTable.findFirst({
		where: eq(dashboardTable.userId, userId)
	});
};

export const updateDashboardViewBy = async (userId: string, view: 'list' | 'grid') => {
	return db.update(dashboardTable).set({ view }).where(eq(dashboardTable.userId, userId));
};

export const updateDashboardSortBy = async (
	userId: string,
	sortBy: 'title' | 'accessed' | 'updated'
) => {
	return db.update(dashboardTable).set({ sortBy }).where(eq(dashboardTable.userId, userId));
};
