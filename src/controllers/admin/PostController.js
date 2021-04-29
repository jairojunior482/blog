const moment = require("moment");

moment.locale("pt-br");

const Post = require("../../models/Post");
const Category = require("../../models/Category");

class CategoryController {
  async createForm(req, res) {
    const categorys = await Category.find({});
    return res.render("admin/post/create", { categorys });
  }

  async create(req, res) {
    const categorys = await Category.find({});
    const { title, content, category } = req.body;
    if (!title || !content || !category) {
      return res.render("admin/post/create", {
        erro: "Preecha todos os dados",
        categorys
      });
    }

    const existsCategory = await Category.findOne({ _id: category });

    if (!existsCategory) {
      return res.render("admin/post/create", {
        erro: "Categoria inválida",
        categorys
      });
    }

    const existsPost = await Post.findOne({ title });

    if (existsPost) {
      return res.render("admin/post/create", {
        erro: "Esse post já existe",
        categorys
      });
    }

    const post = await Post.create({
      title,
      content,
      author: req.user_id,
      category,
      created_at: moment(Date.now()).format("LLL"),
      date: Date.now()
    });
    return res.render("admin/post/create", {
      message: `O post ${post.title} foi criada com sucesso`,
      categorys
    });
  }

  async edit(req, res) {
    const id = req.params.id;

    try {
      const post = await Post.findOne({ _id: id });
      return res.render("admin/post/edit", { post });
    } catch {
      return res.render("admin/post/edit", {
        erro: "Essa categoria não existe"
      });
    }
  }

  async update(req, res) {
    const id = req.params.id;
    const { title } = req.body;

    const post = await Post.findOneAndUpdate({ _id: id }, {
      $set: {
        "title": title
      }
    });
    return res.render("admin/post/edit", {
      message: `${post.title} editada com sucesso`
    });
  }
}

module.exports = new CategoryController;