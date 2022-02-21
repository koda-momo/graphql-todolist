const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Todoモデルの作成.
 */
const todoSchema = new Schema({
  id: String,
  title: String,
  categoryId: String,
  content: String,
});

module.exports = mongoose.model("Todo", todoSchema);
