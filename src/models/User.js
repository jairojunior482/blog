const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  email: String,
  is_admin: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    select: false
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: "Post"
  }]
});

module.exports = mongoose.model("User", UserSchema);