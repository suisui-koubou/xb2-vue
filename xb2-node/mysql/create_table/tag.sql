CREATE TABLE `tag` (
    `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    `name` VARCHAR(255) NOT NULL UNIQUE KEY
)   DEFAULT CHARSET=utf8mb4
    COLLATE=utf8mb4_unicode_ci; 
