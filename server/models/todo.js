const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Todoモデルの作成.
 */
const todoSchema = new Schema({
  title: String,
  finish: Boolean,
  categoryId: String,
});

module.exports = mongoose.model("Todo", todoSchema);
