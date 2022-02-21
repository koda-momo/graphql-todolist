const express = require("express");
const app = express();
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const mongoose = require("mongoose");
require("dotenv").config({ debug: true });
const schema = require("./schema/schema");
const cors = require("cors");
app.use(cors());

/**
 * schemaの使用.
 */
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

/**
 * ポート番号,起動した際に発動するメソッド.
 */
app.listen(4000, () => {
  console.log("サーバに接続しました");
});

/**
 * mongoDBに接続.
 */
mongoose.connect(process.env.DB_URL);
/**
 * mongoDBに接続したら際に発動するメソッド.
 */
mongoose.connection.once("open", () => {
  console.log("mongoDB接続完了");
});
