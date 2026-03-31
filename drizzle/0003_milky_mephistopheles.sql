CREATE TABLE `news` (
	`id` int AUTO_INCREMENT NOT NULL,
	`imageUrl` text NOT NULL,
	`imageHash` varchar(64) NOT NULL,
	`caption` text NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`published` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `news_id` PRIMARY KEY(`id`),
	CONSTRAINT `news_imageHash_unique` UNIQUE(`imageHash`)
);
