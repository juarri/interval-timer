import { db } from '../index';

import { and, eq, sql, desc } from 'drizzle-orm';
import { intervalTimerTable, type NewIntervalTimer } from '../schema';

export const getIntervalTimerById = async (id: string) => {
	return db.query.intervalTimerTable.findFirst({
		where: eq(intervalTimerTable.id, id)
	});
};

export const getIntervalTimers = async (take: number = 20, skip: number = 0) => {
	return db.select().from(intervalTimerTable).offset(skip).limit(take);
};

export const getIntervalTimersByUserId = async (
	userId: string,
	take: number = 10,
	skip: number = 0
) => {
	return db
		.select()
		.from(intervalTimerTable)
		.where(eq(intervalTimerTable.userId, userId))
		.offset(skip)
		.limit(take)
		.orderBy(desc(intervalTimerTable.accessedAt));
};

export const createIntervalTimer = async (intervalTimer: NewIntervalTimer) => {
	return db.insert(intervalTimerTable).values(intervalTimer).returning();
};

export const updateIntervalTimer = async (
	id: string,
	userId: string,
	intervalTimer: Partial<NewIntervalTimer>
) => {
	return db
		.update(intervalTimerTable)
		.set(intervalTimer)
		.where(and(eq(intervalTimerTable.id, id), eq(intervalTimerTable.userId, userId)));
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
