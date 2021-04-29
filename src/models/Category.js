const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CatergorySchema = new Schema({
  name: String
});

module.exports = mongoose.model("Category", CatergorySchema);