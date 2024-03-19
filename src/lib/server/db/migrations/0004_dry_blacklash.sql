ALTER TABLE `interval_timer` RENAME COLUMN `work_time` TO `go_time`;--> statement-breakpoint
ALTER TABLE `interval_timer` RENAME COLUMN `rest_time` TO `stop_time`;--> statement-breakpoint
ALTER TABLE `interval_timer` RENAME COLUMN `amount_of_cycles` TO `intervals`;--> statement-breakpoint
ALTER TABLE `interval_timer` DROP COLUMN `rest_time_between_sets`;--> statement-breakpoint
ALTER TABLE `interval_timer` DROP COLUMN `amount_of_sets`;