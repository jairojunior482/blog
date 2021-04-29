const { Router } = require("express");

const AdminMiddleware = require("./middlewares/AdminMiddleware");

const UserController = require("./controllers/UserController");
const LoginController = require("./controllers/LoginController");
const CategoryController = require("./controllers/admin/CategoryController");

const routes = Router();

routes.get("/", UserController.home);

// User
routes.get("/usuario/registrar", (req, res) => {
  res.render("user/register");
});

routes.post("/usuario/registrar", UserController.register);

routes.get("/usuario/logar", (req, res) => {
  res.render("user/login");
});

routes.post("/usuario/logar", LoginController.login);

routes.get("/usuario/logout", (req, res) => {
  res.clearCookie("@token");
  return res.render("home");
});

// Admin
routes.get("/admin/categoria/criar", AdminMiddleware, (req, res) => {
  return res.render("admin/category/create");
});

routes.post("/admin/categoria/criar", AdminMiddleware, CategoryController.create);

routes.get("/admin/categoria/editar/:id", AdminMiddleware, CategoryController.edit)
routes.post("/admin/categoria/editar/:id", AdminMiddleware, CategoryController.update);


module.exports = routes;