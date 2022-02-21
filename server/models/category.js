const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Categoryモデルの作成.
 */
const categorySchema = new Schema({
  name: String,
});

module.exports = mongoose.model("Category", categorySchema);
