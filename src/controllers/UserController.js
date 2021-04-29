const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const Category = require("../models/Category");

const jwt_secrete = process.env.JWT_SECRETE;

class UserController {
  async home(req, res) {
    const token = req.cookies["@token"];

    const categorys = await Category.find({});

    if (!token) {
      return res.render("home", {
        user: false,
        categorys
      });
    }

    try {
      const decode = jwt.verify(token, jwt_secrete);
      const user = await User.findOne({ _id: decode.user_id });

      if (!user) {
        res.clearCookie("@token");
        return res.redirect("/");
      }

      return res.render("home", { user, categorys });
    } catch {
      res.clearCookie("@token");
      return res.redirect("/");
    }
  }

  async register(req, res) {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.render("user/register", { erro: "Preecha todos os campos" });
    }

    const existsUser = await User.findOne({ email });

    if (existsUser) {
      return res.render("user/register", { erro: "Usuário já existe" });
    }

    const hashPassword = await bcrypt.hash(password, 8);

    const user = await User.create({
      username,
      email,
      password: hashPassword
    });

    user.password = undefined;

    return res.render("user/register", { user });
  }
}

module.exports = new UserController;