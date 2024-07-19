import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable('user', {
	id: text('id').notNull().primaryKey(),
	provider: text('provider', { enum: ['google'] }).notNull(),
	providerId: text('provider_id').notNull().unique(),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	email: text('email').unique().notNull(),
	picture: text('picture')
});

export type newUser = typeof userTable.$inferInsert;
export type User = typeof userTable.$inferSelect;

export const sessionTable = sqliteTable('session', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id, { onDelete: 'cascade' }),
	expiresAt: integer('expires_at').notNull()
});

export type newSession = typeof sessionTable.$inferInsert;
export type Session = typeof sessionTable.$inferSelect;

export const dashboardTable = sqliteTable('dashboard', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.unique()
		.references(() => userTable.id, { onDelete: 'cascade' }),
	sortBy: text('sort_by', { enum: ['title', 'accessed', 'updated'] }).notNull(),
	view: text('view', { enum: ['list', 'grid'] }).notNull()
});

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
	accessedAt: text('accessed_at')
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	pinned: integer('pinned', { mode: 'boolean' }).notNull().default(false),
	title: text('title').notNull(),
	description: text('description').notNull(),
	preparationTime: integer('preparation_time').notNull(),
	goTime: integer('go_time').notNull(),
	stopTime: integer('stop_time').notNull(),
	cooldownTime: integer('cooldown_time').notNull(),
	intervals: integer('intervals').notNull()
});

export type NewIntervalTimer = typeof intervalTimerTable.$inferInsert;
export type IntervalTimer = typeof intervalTimerTable.$inferSelect;
