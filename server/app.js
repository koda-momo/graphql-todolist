const express = require("express");
const app = express();
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const mongoose = require("mongoose");
require("dotenv").config({ debug: true });
mongoose.connect(process.env.DB_URL);

/**
 * ポート番号,起動した際に発動するメソッド.
 */
app.listen(4000, () => {
  console.log("サーバに接続しました");
});

/**
 * mongoDBに接続したら際に発動するメソッド.
 */
mongoose.connection.once("open", () => {
  console.log("mongoDB接続完了");
});
