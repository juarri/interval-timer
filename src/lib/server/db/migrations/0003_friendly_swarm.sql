ALTER TABLE interval_timer ADD `preparation_time` integer NOT NULL;--> statement-breakpoint
ALTER TABLE interval_timer ADD `work_time` integer NOT NULL;--> statement-breakpoint
ALTER TABLE interval_timer ADD `rest_time` integer NOT NULL;--> statement-breakpoint
ALTER TABLE interval_timer ADD `rest_time_between_sets` integer NOT NULL;--> statement-breakpoint
ALTER TABLE interval_timer ADD `cooldown_time` integer NOT NULL;--> statement-breakpoint
ALTER TABLE interval_timer ADD `amount_of_cycles` integer NOT NULL;--> statement-breakpoint
ALTER TABLE interval_timer ADD `amount_of_sets` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `interval_timer` DROP COLUMN `routine`;