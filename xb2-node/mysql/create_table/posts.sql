CREATE TABLE `posts` (
    `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    `title` VARCHAR(255) NOT NULL, 
    `content` LONGTEXT
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; 
