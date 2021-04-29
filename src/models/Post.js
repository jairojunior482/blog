const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  content: String,
  sub_content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  }
});

module.exports = mongoose.model("Post", PostSchema);