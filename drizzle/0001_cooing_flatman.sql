CREATE TABLE `contacts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`company` varchar(255),
	`phone` varchar(20),
	`message` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contacts_id` PRIMARY KEY(`id`)
);
