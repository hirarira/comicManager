"use strict";
const Express = require("express");
const app = Express();
const BodyParser = require('body-parser');

const DBSetting = require('./model/dbSetting.js');
const User = require('./model/user.js');
const Author = require('./model/author.js');
const Comic = require('./model/comic.js');
const ComicVol = require('./model/comicVol.js');
const ComicVolInfo = require('./model/comicVolInfo.js');
const ComicReview = require('./model/comicReview.js');

const dbsettings = DBSetting();
const user = new User(dbsettings);
const author = new Author(dbsettings);
const comic = new Comic(dbsettings);
const comicVol = new ComicVol(dbsettings);
const comicVolInfo = new ComicVolInfo(dbsettings);
const comicReview = new ComicReview(dbsettings);

// urlencodedとjsonは別々に初期化する
app.use(BodyParser.urlencoded({
  extended: true
}));

app.use(BodyParser.json());

const server = app.listen(3333, function(){
  console.log("Node.js is listening to PORT:" + server.address().port);
});

app.get("/status", (req, res)=>{
  const testBody = {
    'status': 'ok',
    'message': 'status ok',
    'body': ''
  }
  res.header('Content-Type', 'application/json');
  res.send(testBody);
});

app.get("/get/user/:userid", async (req, res)=>{
  let resBody = {};
  try {
    const userid = req.params.userid;
    const userData = await user.getUser(userid);
    resBody = {
      'status': 'ok',
      'message': '',
      'body': userData
    }
  } catch(e) {
    resBody = {
      'status': 'ng',
      'message': '',
      'body': e.message
    }
  }
  res.header('Content-Type', 'application/json');
  res.send(resBody);
});

app.get("/get/authors", async (req, res)=>{
  let resBody = {};
  try {
    const authorList = await author.getAuthors();
    resBody = {
      'status': 'ok',
      'message': '',
      'body': authorList
    }
  } catch(e) {
    resBody = {
      'status': 'ng',
      'message': '',
      'body': e.message
    }
  }
  res.header('Content-Type', 'application/json');
  res.send(resBody);
});

app.post("/create/author", async (req, res)=>{
  let resBody = {};
  try {
    const addName = req.body.name;
    const result = await author.createAuthor({
      name: addName
    });
    resBody = {
      'status': 'ok',
      'message': '',
      'body': result
    }
  } catch(e) {
    resBody = {
      'status': 'ng',
      'message': '',
      'body': e.message
    }
  }
  res.header('Content-Type', 'application/json');
  res.send(resBody);
});

/**
 * Comics 漫画の概要を操作する関数
 */
app.get("/get/comic/:id", async (req, res)=>{
  const userID = 1;
  let resBody = {};
  try {
    const id = req.params.id; 
    const resComics = await comic.getComic(id);
    const resAuthor = resComics? await author.getAuthor(resComics.authorID): '';
    const resComicReview = await comicReview.getReview(id, userID);
    resBody = {
      'status': 'ok',
      'message': '',
      'body': resComics,
      'author': resAuthor,
      'review': resComicReview
    }
  } catch(e) {
    resBody = {
      'status': 'ng',
      'message': '',
      'body': e.message
    }
  }
  res.header('Content-Type', 'application/json');
  res.send(resBody);
});

app.get("/get/comicList", async (req, res)=>{
  let resBody = {};
  try {
    const resComics = await comic.getComicList();
    resBody = {
      'status': 'ok',
      'message': '',
      'body': resComics
    }
  } catch(e) {
    resBody = {
      'status': 'ng',
      'message': '',
      'body': e.message
    }
  }
  res.header('Content-Type', 'application/json');
  res.send(resBody);
});

app.post("/create/comic", async (req, res)=>{
  let resBody = {};
  try {
    const resComics = await comic.createComic({
      title: req.body.title,
      authorID: req.body.authorID,
      image: req.body.image
    });
    resBody = {
      'status': 'ok',
      'message': '',
      'body': resComics
    }
  } catch(e) {
    resBody = {
      'status': 'ng',
      'message': '',
      'body': e.message
    }
  }
  res.header('Content-Type', 'application/json');
  res.send(resBody);
});

app.post("/update/comic", async (req, res)=>{
  let resBody = {};
  try {
    const resComics = await comic.updateComic({
      id: req.body.id,
      title: req.body.title,
      authorID: req.body.authorID,
      endFlag: (req.body.endFlag === 'true'),
      image: req.body.image
    });
    resBody = {
      'status': 'ok',
      'message': '',
      'body': resComics
    }
  } catch(e) {
    resBody = {
      'status': 'ng',
      'message': '',
      'body': e.message
    }
  }
  res.header('Content-Type', 'application/json');
  res.send(resBody);
});

/**
 * ComicVol: 漫画の各話情報を管理する関数
 */
app.get("/get/comicVol/:comicID", async (req, res)=>{
  let resBody = {};
  try {
    const userID = 1;
    const comicID = req.params.comicID;
    const resComics = await comic.getComic(comicID);
    const resAuthor = resComics? await author.getAuthor(resComics.authorID): '';
    let resComicVol = await comicVol.getComicVol(comicID);
    resComicVol = await comicVolInfo.getComicVol(resComicVol, userID);
    resBody = {
      'status': 'ok',
      'message': '',
      'body': {
        about: resComics,
        author: resAuthor,
        detail: resComicVol
      }
    }
  } catch(e) {
    resBody = {
      'status': 'ng',
      'message': '',
      'body': e.message
    }
  }
  res.header('Content-Type', 'application/json');
  res.send(resBody);
});

app.post("/create/comicVol", async (req, res)=>{
  let resBody = {};
  try {
    const resComicVol = await comicVol.createComicVol({
      comicID: req.body.comicID,
      number: req.body.number,
      image: req.body.image
    });
    resBody = {
      'status': 'ok',
      'message': '',
      'body': resComicVol
    }
  } catch(e) {
    resBody = {
      'status': 'ng',
      'message': '',
      'body': e.message
    }
  }
  res.header('Content-Type', 'application/json');
  res.send(resBody);
});


app.post("/update/comicVol", async (req, res)=>{
  let resBody = {};
  try {
    const resComicVol = await comicVol.updateComicVol({
      comicID: req.body.comicID,
      number: req.body.number,
      image: req.body.image
    });
    resBody = {
      'status': 'ok',
      'message': '',
      'body': resComicVol
    }
  } catch(e) {
    resBody = {
      'status': 'ng',
      'message': '',
      'body': e.message
    }
  }
  res.header('Content-Type', 'application/json');
  res.send(resBody);
});

/**
 * comicVolInfo: 漫画の各話の既読・コメントを管理する関数
 */
app.post("/create/comicVolInfo", async (req, res)=>{
  let resBody = {};
  try {
    const resComicVol = await comicVolInfo.createComicVolInfo({
      comicVolID: req.body.comicVolID,
      userID: req.body.userID,
      readFlag: (req.body.readFlag === 'true'),
      readDate: req.body.readDate,
      buyFlag: (req.body.buyFlag === 'true'),
      buyDate: req.body.buyDate,
      comment: req.body.comment
    });
    resBody = {
      'status': 'ok',
      'message': '',
      'body': resComicVol
    }
  } catch(e) {
    resBody = {
      'status': 'ng',
      'message': '',
      'body': e.message
    }
  }
  res.header('Content-Type', 'application/json');
  res.send(resBody);
});

/**
 * comicReview: 漫画の既読・コメントを管理する関数
 */
app.post("/create/comicReview", async (req, res)=>{
  let resBody = {};
  try {
    const resComicReview = await comicReview.createComicReview({
      comicID: req.body.comicID,
      userID: req.body.userID,
      rate: req.body.rate,
      comment: req.body.comment
    });
    resBody = {
      'status': 'ok',
      'message': '',
      'body': resComicReview
    }
  } catch(e) {
    resBody = {
      'status': 'ng',
      'message': '',
      'body': e.message
    }
  }
  res.header('Content-Type', 'application/json');
  res.send(resBody);
});

// 404
app.use(function(req, res, next) {
  res.header('Content-Type', 'application/json');
  let res_body = {
    status: 'ng',
    body: '404 not found'
  };
  res.status(404).send(res_body);
});