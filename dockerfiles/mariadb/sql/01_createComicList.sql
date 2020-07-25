use comicManager;

CREATE TABLE `comic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL UNIQUE,
  `authorID` int(11) NOT NULL,
  `endFlag` tinyint(1) NOT NULL,
  `image` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `comicReview` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comicID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `rate` int(11),
  `comment` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` text NOT NULL UNIQUE,
  `pass` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

CREATE TABLE `author` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `comicVol` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comicID` int(11) NOT NULL,
  `number` varchar(128) NOT NULL,
  `image` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `comicVolInfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comicVolID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `readFlag` tinyint(1) NOT NULL,
  `readDate` int(11),
  `buyFlag` tinyint(1) NOT NULL,
  `buyDate` int(11),
  `comment` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
