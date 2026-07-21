CREATE TABLE `story_views` (
	`story_id` text PRIMARY KEY NOT NULL,
	`views` integer DEFAULT 0 NOT NULL,
	`updated_at` text NOT NULL
);
