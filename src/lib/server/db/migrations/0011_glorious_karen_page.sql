CREATE TABLE `menu_options` (
	`user_id` text NOT NULL,
	`sort_by` text NOT NULL,
	`view` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
