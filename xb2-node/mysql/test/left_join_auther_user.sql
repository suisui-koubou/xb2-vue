SELECT `posts`.`id`, `posts`.`title`, `user`.`name`, `posts`.`content` FROM `posts`
    LEFT JOIN `user` 
    ON `user`.`id` = `posts`.`userId`; 