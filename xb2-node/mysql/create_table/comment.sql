CREATE TABLE `comment` (
    `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `content` LONGTEXT,
    `postId` INT(11) NOT NULL,
    `userId` INT(11) NOT NULL, 
    `parentId` INT(11) DEFAULT NULL, 
    # The column `postId` is related to the `id` column in posts table 
    FOREIGN KEY (`postId`) REFERENCES `posts`(`id`)
        ON DELETE NO ACTION ON UPDATE NO ACTION, 
    FOREIGN KEY (`userId`) REFERENCES `user`(`id`)
        ON DELETE NO ACTION ON UPDATE NO ACTION,
    # a comment may be a reply to another comment. 
    FOREIGN KEY (`parentId`) REFERENCES `comment`(`id`)
        ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_unicode_ci; 