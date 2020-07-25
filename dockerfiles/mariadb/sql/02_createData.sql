use comicManager;

INSERT INTO `user` ( `username`, `pass`) VALUES ('hirarira', 'hirarira');

INSERT INTO `author` ( `name` ) VALUES ( 'テスト太郎' );
INSERT INTO `author` ( `name` ) VALUES ( '山下泰平' );

INSERT INTO `comic` (`title`, `authorID`, `endFlag`) VALUES ('テスト物語', 1, 0);
INSERT INTO `comic` (`title`, `authorID`, `endFlag`) VALUES ('「舞姫」の主人公をバンカラとアフリカ人がボコボコにする最高の小説の世界が明治に存在したので20万字くらいかけて紹介する本', 2, 0);
