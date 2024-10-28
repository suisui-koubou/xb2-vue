CREATE TABLE `user_like_post` (
    `userId` INT(11) NOT NULL,
    `postId` INT(11) NOT NULL,
    PRIMARY KEY (`userId`, `postId`), 
    FOREIGN KEY (`userId`) REFERENCES `user`(`id`)
        ON DELETE NO ACTION ON UPDATE NO ACTION, 
    FOREIGN KEY (`postId`) REFERENCES `posts`(`id`)
        ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_unicode_ci; 