import { db } from '../index';

import { eq } from 'drizzle-orm';
import { dashboardTable } from '../schema';

import { generateId } from 'lucia';

export const getDashboard = async (userId: string) => {
	return db.query.dashboardTable.findFirst({
		where: eq(dashboardTable.userId, userId)
	});
};

export const upsertDashboard = async (userId: string) => {
	return db
		.insert(dashboardTable)
		.values({
			id: generateId(20),
			userId: userId,
			sortBy: 'accessed',
			view: 'grid'
		})
		.onConflictDoNothing({
			target: dashboardTable.userId
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
