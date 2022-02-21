const express = require("express");
const app = express();
const graphqlHTTP = require("express-graphql").graphqlHTTP;

/**
 * ポート番号,起動した際に発動するメソッド
 */
app.listen(4000, () => {
  console.log("サーバに接続しました");
});
