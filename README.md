# ComicManager

漫画管理アプリ

## 構成
|name|説明|
|--|--|
|mariadb|データベース|
|express|バックエンドAPI|
|nginx|フロントエンドサーバー|

## 動かし方
* フルアプリで起動したい時
  * `docker-compose up -d`
* DBだけ動かしてExpress.jsの調整をする時
  * `docker-compose -d -f docker-compose-onlydb.yml`
* Localでフロントエンドを調整したい時
  * `docker-compose -d -f docker-compose-local.yml`
* DBだけ動かしてExpress.jsの調整をする時
  * `docker-compose -d -f docker-compose-build.yml`
