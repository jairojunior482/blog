const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  },
  date: {
    type: Number,
  },
  created_at: {
    type: String, 
  },
  updated_at: {
    type: String, 
    default: null
  }
});

module.exports = mongoose.model("Post", PostSchema);