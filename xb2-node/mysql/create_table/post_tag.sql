CREATE TABLE `post_tag` (
    `postId` INT(11) NOT NULL, 
    `tagId` INT(11) NOT NULL,
    PRIMARY KEY(`postId`, `tagId`), 
    FOREIGN KEY(`postId`) REFERENCES `posts`(`id`)
        ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY(`tagId`) REFERENCES `tag`(`id`)
        ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;   