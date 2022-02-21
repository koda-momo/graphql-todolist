const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Categoryモデルの作成.
 */
const categorySchema = new Schema({
  id: String,
  name: String,
});

module.exports = mongoose.model("Category", categorySchema);
