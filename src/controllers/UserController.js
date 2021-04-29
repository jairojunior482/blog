const Category = require("../models/Category");
const Post = require("../models/Post");
class UserController {
  async home(req, res) {
    const categorys = await Category.find({});
    const posts = await Post.find({}).populate("category author")
      .sort({ date: "desc" }).limit(5);

    return res.render("home", {
      categorys,
      posts,
    });
  }
}

module.exports = new UserController;