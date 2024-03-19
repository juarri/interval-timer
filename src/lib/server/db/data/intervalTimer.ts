import { db } from '../index';

import { eq } from 'drizzle-orm';
import { intervalTimerTable, type NewIntervalTimer } from '../schema';

export const getIntervalTimers = async (take: number = 10, skip: number = 0) => {
	return db.select().from(intervalTimerTable).offset(skip).limit(take);
};

export const getIntervalTimerById = async (id: string) => {
	return db.query.intervalTimerTable.findFirst({
		where: eq(intervalTimerTable.id, id)
	});
};

export const postIntervalTimer = async (intervalTimer: NewIntervalTimer) => {
	return db.insert(intervalTimerTable).values(intervalTimer).returning();
};

export const updateIntervalTimer = async (id: string, intervalTimer: Partial<NewIntervalTimer>) => {
	return db.update(intervalTimerTable).set(intervalTimer).where(eq(intervalTimerTable.id, id));
};
