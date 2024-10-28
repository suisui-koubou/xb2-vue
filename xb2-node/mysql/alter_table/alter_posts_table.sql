ALTER TABLE `posts`
    ADD `userId` INT(11) DEFAULT NULL; 


ALTER TABLE `posts`
    ADD FOREIGN KEY(`userId`)
        REFERENCES `user`(`id`)
        ON DELETE NO ACTION 
        ON UPDATE NO ACTION; 