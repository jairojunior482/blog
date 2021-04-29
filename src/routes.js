const { Router } = require("express");

const AdminMiddleware = require("./middlewares/AdminMiddleware");
const RegisterAdmin = require("./middlewares/RegisterAdmin");

const UserController = require("./controllers/UserController");
const LoginController = require("./controllers/admin/LoginController");

const CategoryController = require("./controllers/admin/CategoryController");
const PostController = require("./controllers/admin/PostController");


const routes = Router();

routes.get("/", UserController.home);

routes.get("/admin/register", (req, res) => {
  res.cookie("@register", "nodeblog");
  return res.redirect("/registrar");
});

// Register
routes.get("/registrar", RegisterAdmin, LoginController.registerForm);
routes.post("/registrar", RegisterAdmin, LoginController.registerUser);

//Login
routes.get("/logar", RegisterAdmin, LoginController.loginForm);
routes.post("/logar", RegisterAdmin, LoginController.loginUser);


// Category
routes.get("/admin/categoria/criar", AdminMiddleware, (req, res) => {
  res.render("admin/category/create");
});
routes.post("/admin/categoria/criar", AdminMiddleware, CategoryController.create);

routes.get("/admin/categoria/editar/:id", AdminMiddleware, CategoryController.edit);
routes.post("/admin/categoria/editar/:id", AdminMiddleware, CategoryController.update);

// Post
routes.get("/admin/post/criar", AdminMiddleware, PostController.createForm);
routes.post("/admin/post/criar", AdminMiddleware, PostController.create);

routes.get("/admin/post/editar/:id", AdminMiddleware, PostController.edit);
routes.post("/admin/post/editar/:id", AdminMiddleware, PostController.update);

module.exports = routes;