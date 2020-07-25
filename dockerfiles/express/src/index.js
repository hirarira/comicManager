"use strict";
const Express = require("express");
const app = Express();
const BodyParser = require('body-parser');

const DBSetting = require('./model/dbSetting.js');
const User = require('./model/user.js');
const Author = require('./model/author.js');
const Comic = require('./model/comic.js');

const dbsettings = DBSetting();
const user = new User(dbsettings);
const author = new Author(dbsettings);
const comic = new Comic(dbsettings);

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
    const userData = await user.gerUser(userid);
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

app.get("/get/comic/:id", async (req, res)=>{
  let resBody = {};
  try {
    const id = req.params.id; 
    const resComics = await comic.getComic(id);
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

app.get("/test", async (req, res)=>{
  let resBody = {};
  try {
    const resAuthor = await author.gerAuthor(0);
    const resAuthors = await author.getAuthors();
    resBody = {
      'status': 'ok',
      'message': 'status ok',
      'body': {
        resAuthor: resAuthor,
        resAuthors: resAuthors
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

// 404
app.use(function(req, res, next) {
  res.header('Content-Type', 'application/json');
  let res_body = {
    status: 'ng',
    body: '404 not found'
  };
  res.status(404).send(res_body);
});