"use strict";
const Express = require("express");
const app = Express();
const BodyParser = require('body-parser');

const DBSetting = require('./model/dbSetting.js');

const sequelize = DBSetting();

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
    'message': 'status ok'
  }
  res.header('Content-Type', 'application/json');
  res.send(testBody);
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