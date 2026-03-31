CREATE TABLE `files` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fileName` varchar(255) NOT NULL,
	`fileKey` varchar(512) NOT NULL,
	`fileUrl` text NOT NULL,
	`fileSize` int NOT NULL,
	`mimeType` varchar(100) NOT NULL,
	`uploadedBy` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `files_id` PRIMARY KEY(`id`),
	CONSTRAINT `files_fileKey_unique` UNIQUE(`fileKey`)
);
