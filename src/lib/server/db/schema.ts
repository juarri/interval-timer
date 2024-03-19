import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import z from 'zod';

export const userTable = sqliteTable('user', {
	id: text('id').notNull().primaryKey(),
	provider: text('provider', { enum: ['google'] }).notNull(),
	providerId: text('provider_id').notNull(),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	email: text('email').unique().notNull(),
	picture: text('picture')
});

export type newUser = typeof userTable.$inferInsert;
export type User = typeof userTable.$inferSelect;
export const newUserSchema = createInsertSchema(userTable);
export const userSchema = createSelectSchema(userTable);

export const sessionTable = sqliteTable('session', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id, { onDelete: 'cascade' }),
	expiresAt: integer('expires_at').notNull()
});

export type newSession = typeof sessionTable.$inferInsert;
export type Session = typeof sessionTable.$inferSelect;
export const newSessionSchema = createInsertSchema(sessionTable);
export const sessionSchema = createSelectSchema(sessionTable);

export const intervalTimerTable = sqliteTable('interval_timer', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id, { onDelete: 'cascade' }),
	createdAt: text('created_at')
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	updatedAt: text('updated_at')
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	title: text('title').notNull(),
	preparationTime: integer('preparation_time').notNull(),
	goTime: integer('go_time').notNull(),
	stopTime: integer('stop_time').notNull(),
	cooldownTime: integer('cooldown_time').notNull(),
	intervals: integer('intervals').notNull()
});

export type NewIntervalTimer = typeof intervalTimerTable.$inferInsert;
export type IntervalTimer = typeof intervalTimerTable.$inferSelect;
export const newIntervalTimerSchema = createInsertSchema(intervalTimerTable, {
	preparationTime: z.number().int().min(0).default(0),
	goTime: z.number().int().min(0).default(0),
	stopTime: z.number().int().min(0).default(0),
	cooldownTime: z.number().int().min(0).default(0),
	intervals: z.number().int().min(1).default(1)
});
export const intervalTimerSchema = createSelectSchema(intervalTimerTable, {
	preparationTime: z.number().int().min(0).default(0),
	goTime: z.number().int().min(0).default(0),
	stopTime: z.number().int().min(0).default(0),
	cooldownTime: z.number().int().min(0).default(0),
	intervals: z.number().int().min(1).default(1)
});
