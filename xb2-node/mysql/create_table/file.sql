CREATE TABLE `file`(
    `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    `originalname` VARCHAR(255) NOT NULL, 
    `mimetype` VARCHAR(255) NOT NULL, 
    `filename` VARCHAR(255) NOT NULL, 
    `size` INT(11) NOT NULL, 
    `userId` INT(11) NOT NULL, 
    `postId` INT(11) NOT NULL, 
    FOREIGN KEY (`userId`) REFERENCES `user`(`id`)
        ON DELETE NO ACTION ON UPDATE NO ACTION, 
    FOREIGN KEY (`postId`) REFERENCES `posts`(`id`) 
        ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_unicode_ci;



