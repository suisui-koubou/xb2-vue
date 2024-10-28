ALTER TABLE `file` ADD COLUMN(
    `width` SMALLINT(6) NOT NULL, 
    `height` SMALLINT(6) NOT NULL, 
    `metadata` JSON DEFAULT NULL
); 