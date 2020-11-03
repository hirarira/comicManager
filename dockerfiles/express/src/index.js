"use strict";
const Express = require("express");
const app = Express();
const cors = require('cors');
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

app.use(cors());

// urlencodedとjsonは別々に初期化する
app.use(BodyParser.urlencoded({
  extended: true
}));

app.use(BodyParser.json());

const server = app.listen(3334, function(){
  console.log("Node.js is listening to PORT:" + server.address().port);
});

// 共通のヘッダーを追加する
const addCommonHeader = (res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Content-Type', 'application/json');
  return res;
}

app.get("/status", (req, res)=>{
  const testBody = {
    'status': 'ok',
    'message': 'status ok',
    'body': ''
  }
  res = addCommonHeader(res);
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
    res = res.status(400);
  }
  res = addCommonHeader(res);
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
    res = res.status(400);
  }
  res = addCommonHeader(res);
  res.send(resBody);
});

app.post("/create/author", async (req, res)=>{
  let resBody = {};
  try {
    const addName = req.body.name;
    const postBody = {
      name: addName
    }
    const result = await author.createAuthor();
    resBody = {
      'status': 'ok',
      'message': '',
      'body': {
        req: postBody,
        res: result
      }
    }
  } catch(e) {
    resBody = {
      'status': 'ng',
      'message': '',
      'body': e.message
    }
    res = res.status(400);
  }
  res = addCommonHeader(res);
  res.send(resBody);
});

/**
 * Comics 漫画の概要を操作する関数
 */
app.get("/get/comic/:comicID", async (req, res)=>{
  let resBody = {};
  try {
    const userID = 1;
    const comicID = req.params.comicID;
    const resComics = await comic.getComic(comicID);
    const resAuthor = resComics? await author.getAuthor(resComics.authorID): '';
    let resComicVol = await comicVol.getComicVol(comicID);
    resComicVol = await comicVolInfo.getComicVol(resComicVol, userID);
    const resComicReview = await comicReview.getReview(comicID, userID);
    resBody = {
      'status': 'ok',
      'message': '',
      'body': {
        about: resComics,
        author: resAuthor,
        review: resComicReview,
        detail: resComicVol
      }
    }
  } catch(e) {
    resBody = {
      'status': 'ng',
      'message': '',
      'body': e.message
    }
    res = res.status(400);
  }
  res = addCommonHeader(res);
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
    res = res.status(400);
  }
  res = addCommonHeader(res);
  res.send(resBody);
});

app.post("/create/comic", async (req, res)=>{
  let resBody = {};
  try {
    const reqBody = {
      title: req.body.title,
      authorID: req.body.authorID,
      image: req.body.image
    }
    const resComics = await comic.createComic(reqBody);
    resBody = {
      'status': 'ok',
      'message': '',
      'body': {
        req: reqBody,
        res: resComics
      }
    }
  } catch(e) {
    resBody = {
      'status': 'ng',
      'message': '',
      'body': e.message
    }
    res = res.status(400);
  }
  res = addCommonHeader(res);
  res.send(resBody);
});

app.put("/update/comic", async (req, res)=>{
  let resBody = {};
  try {
    const reqBody = {
      id: req.body.id,
      title: req.body.title,
      authorID: req.body.authorID,
      endFlag: (req.body.endFlag === 'true'),
      image: req.body.image
    }
    const resComics = await comic.updateComic(reqBody);
    resBody = {
      'status': 'ok',
      'message': '',
      'body': {
        req: reqBody,
        res: resComics
      }
    }
  } catch(e) {
    resBody = {
      'status': 'ng',
      'message': '',
      'body': e.message
    }
    res = res.status(400);
  }
  res = addCommonHeader(res);
  res.send(resBody);
});

/**
 * ComicVol: 漫画の各話情報を管理する関数
 */
app.post("/create/comicVol", async (req, res)=>{
  let resBody = {};
  try {
    const reqBody = {
      comicID: req.body.comicID,
      number: req.body.number,
      image: req.body.image
    }
    const resComicVol = await comicVol.createComicVol(reqBody);
    resBody = {
      'status': 'ok',
      'message': '',
      'body': {
        req: reqBody,
        res: resComicVol
      }
    }
  } catch(e) {
    resBody = {
      'status': 'ng',
      'message': '',
      'body': e.message
    }
    res = res.status(400);
  }
  res = addCommonHeader(res);
  res.send(resBody);
});


app.put("/update/comicVol", async (req, res)=>{
  let resBody = {};
  try {
    const reqBody = {
      comicID: req.body.comicID,
      number: req.body.number,
      image: req.body.image
    };
    const resComicVol = await comicVol.updateComicVol(reqBody);
    resBody = {
      'status': 'ok',
      'message': '',
      'body': {
        req: reqBody,
        res: resComicVol
      }
    }
  } catch(e) {
    resBody = {
      'status': 'ng',
      'message': '',
      'body': e.message
    }
  }
  res = addCommonHeader(res);
  res.send(resBody);
});

/**
 * comicVolInfo: 漫画の各話の既読・コメントを管理する関数
 */
app.post("/create/comicVolInfo", async (req, res)=>{
  let resBody = {};
  try {
    const reqBody = {
      comicVolID: req.body.comicVolID,
      userID: req.body.userID,
      readFlag: (req.body.readFlag === 'true'),
      readDate: req.body.readDate,
      buyFlag: (req.body.buyFlag === 'true'),
      buyDate: req.body.buyDate,
      comment: req.body.comment
    };
    const resComicVol = await comicVolInfo.createComicVolInfo(reqBody);
    resBody = {
      'status': 'ok',
      'message': '',
      'body': { 
        req: reqBody,
        res: resComicVol
      }
    }
  } catch(e) {
    resBody = {
      'status': 'ng',
      'message': '',
      'body': e.message
    }
  }
  res = addCommonHeader(res);
  res.send(resBody);
});

app.put("/update/comicVolInfo", async (req, res)=>{
  let resBody = {};
  try {
    const reqBody = {
      comicVolID: req.body.comicVolID,
      userID: req.body.userID,
      readFlag: (req.body.readFlag === 'true'),
      readDate: req.body.readDate,
      buyFlag: (req.body.buyFlag === 'true'),
      buyDate: req.body.buyDate,
      comment: req.body.comment
    };
    const resComicVol = await comicVolInfo.updateComicVolInfo(reqBody);
    resBody = {
      'status': 'ok',
      'message': '',
      'body': { 
        req: reqBody,
        res: resComicVol
      }
    }
  } catch(e) {
    resBody = {
      'status': 'ng',
      'message': '',
      'body': e.message
    }
  }
  res = addCommonHeader(res);
  res.send(resBody);
});

/**
 * comicReview: 漫画の既読・コメントを管理する関数
 */
app.post("/create/comicReview", async (req, res)=>{
  let resBody = {};
  try {
    const reqBody = {
      comicID: req.body.comicID,
      userID: req.body.userID,
      rate: req.body.rate,
      comment: req.body.comment
    };
    const resComicReview = await comicReview.createComicReview(reqBody);
    resBody = {
      'status': 'ok',
      'message': '',
      'body': {
        req: reqBody,
        res: resComicReview
      }
    }
  } catch(e) {
    resBody = {
      'status': 'ng',
      'message': '',
      'body': e.message
    }
  }
  res = addCommonHeader(res);
  res.send(resBody);
});

app.put("/update/comicReview", async (req, res)=>{
  let resBody = {};
  try {
    const reqBody = {
      comicID: req.body.comicID,
      userID: req.body.userID,
      rate: req.body.rate,
      comment: req.body.comment
    };
    const resComicReview = await comicReview.updateComicReview(reqBody);
    resBody = {
      'status': 'ok',
      'message': '',
      'body': {
        req: reqBody,
        res: resComicReview
      }
    }
  } catch(e) {
    resBody = {
      'status': 'ng',
      'message': '',
      'body': e.message
    }
  }
  res = addCommonHeader(res);
  res.send(resBody);
});

// 404
app.use(function(req, res, next) {
  let res_body = {
    status: 'ng',
    body: '404 not found'
  };
  res = addCommonHeader(res);
  res.status(404).send(res_body);
});