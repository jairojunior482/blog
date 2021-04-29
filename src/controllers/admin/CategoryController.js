const Category = require("../../models/Category");

class CategoryController {
  async create(req, res) {
    const { name } = req.body;
    if (!name) {
      return res.render("admin/category/create", { erro: "Preecha os dados" });
    }

    const existsCategory = await Category.findOne({ name });

    if (existsCategory) {
      return res.render("admin/category/create", {
        erro: "Essa categoria já existe"
      });
    }

    const category = await Category.create({ name });
    return res.render("admin/category/create", {
      message: `A categoria ${category.name} foi criada com sucesso`
    });
  }

  async edit(req, res) {
    const id = req.params.id;

    try {
      const category = await Category.findOne({ _id: id });
      return res.render("admin/category/edit", { category });
    } catch {
      return res.render("admin/category/edit", {
        erro: "Essa categoria não existe"
      });
    }
  }

  async update(req, res) {
    const id = req.params.id;
    const { name } = req.body;

    const category = await Category.findOneAndUpdate({ _id: id }, {
      $set: {
        "name": name
      }
    });
    return res.render("admin/category/edit", {
      message: `${category.name} editada com sucesso`
    });
  }
}

module.exports = new CategoryController;