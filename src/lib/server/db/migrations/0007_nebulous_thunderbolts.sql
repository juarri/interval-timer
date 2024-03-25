ALTER TABLE interval_timer ADD `accessed_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL;--> statement-breakpoint
ALTER TABLE interval_timer ADD `pinned` integer DEFAULT 0 NOT NULL;