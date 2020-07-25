use comicManager;

INSERT INTO `user` ( `username`, `pass`) VALUES ('hirarira', 'hirarira');

INSERT INTO `author` ( `name` ) VALUES ( 'テスト太郎' );
INSERT INTO `author` ( `name` ) VALUES ( '山下泰平' );

INSERT INTO `comic` (`title`, `authorID`, `endFlag`) VALUES ('テスト物語', 1, 0);
INSERT INTO `comic` (`title`, `authorID`, `endFlag`) VALUES ('「舞姫」の主人公をバンカラとアフリカ人がボコボコにする最高の小説の世界が明治に存在したので20万字くらいかけて紹介する本', 2, 0);

INSERT INTO `comicVol` (`comicID`, `number`) VALUES (1, 1);
INSERT INTO `comicVol` (`comicID`, `number`) VALUES (1, 2);
INSERT INTO `comicVol` (`comicID`, `number`) VALUES (1, 3);

INSERT INTO `comicVol` (`comicID`, `number`) VALUES (2, 1);

INSERT INTO `comicVolInfo` (`comicVolID`, `userID`,`readFlag`, `readDate`, `buyFlag`, `buyDate`, `comment`) VALUES (1, 1, 1, NULL, 1, NULL, '購入既読');
INSERT INTO `comicVolInfo` (`comicVolID`, `userID`,`readFlag`, `readDate`, `buyFlag`, `buyDate`, `comment`) VALUES (1, 1, 1, NULL, 0, NULL, '未購入既読');
