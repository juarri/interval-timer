import { db } from '../index';

import { and, eq, sql, desc, asc } from 'drizzle-orm';
import { intervalTimerTable, type NewIntervalTimer } from '../schema';

type GetIntervalTimersOptions = {
	take?: number;
	skip?: number;
	sortBy?: 'title' | 'accessed' | 'updated';
	query?: string;
};

export const getIntervalTimerById = async (id: string) => {
	return db.query.intervalTimerTable.findFirst({
		where: eq(intervalTimerTable.id, id)
	});
};

export const getIntervalTimersByUserId = async (
	userId: string,
	{ take = 20, skip = 0, sortBy = 'accessed', query }: GetIntervalTimersOptions
) => {
	let baseQuery = db
		.select()
		.from(intervalTimerTable)
		.where(eq(intervalTimerTable.userId, userId))
		.offset(skip)
		.limit(take)
		.$dynamic();

	if (query) {
		baseQuery = baseQuery.where(
			sql`lower(${intervalTimerTable.title}) LIKE lower('%' || ${query} || '%') OR lower(${intervalTimerTable.description}) LIKE lower('%' || ${query} || '%')`
		);
	}

	if (sortBy === 'accessed') {
		baseQuery = baseQuery.orderBy(desc(intervalTimerTable.accessedAt));
	}

	if (sortBy === 'updated') {
		baseQuery = baseQuery.orderBy(desc(intervalTimerTable.updatedAt));
	}

	if (sortBy === 'title') {
		baseQuery = baseQuery.orderBy(asc(intervalTimerTable.title));
	}

	return baseQuery;
};

export const createIntervalTimer = async (intervalTimer: NewIntervalTimer) => {
	const [createdIntervalTimer] = await db
		.insert(intervalTimerTable)
		.values(intervalTimer)
		.returning();

	return createdIntervalTimer;
};

export const updateIntervalTimer = async (
	id: string,
	userId: string,
	intervalTimer: Partial<NewIntervalTimer>
) => {
	const [updatedIntervalTimer] = await db
		.update(intervalTimerTable)
		.set(intervalTimer)
		.where(and(eq(intervalTimerTable.id, id), eq(intervalTimerTable.userId, userId)))
		.returning();

	return updatedIntervalTimer;
};

export const deleteIntervalTimer = async (id: string, userId: string) => {
	return db
		.delete(intervalTimerTable)
		.where(and(eq(intervalTimerTable.id, id), eq(intervalTimerTable.userId, userId)));
};

export const intervalTimerUpdateAccessedAt = async (id: string, userId: string) => {
	return db
		.update(intervalTimerTable)
		.set({ accessedAt: sql`CURRENT_TIMESTAMP` })
		.where(and(eq(intervalTimerTable.id, id), eq(intervalTimerTable.userId, userId)));
};

export const intervalTimerUpdateUpdatedAt = async (id: string, userId: string) => {
	return db
		.update(intervalTimerTable)
		.set({ updatedAt: sql`CURRENT_TIMESTAMP` })
		.where(and(eq(intervalTimerTable.id, id), eq(intervalTimerTable.userId, userId)));
};
