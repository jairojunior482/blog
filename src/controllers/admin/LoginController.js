const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

const jwt_secrete = process.env.JWT_SECRETE;

class LoginController {
  registerForm(req, res) {
    return res.render("admin/user/register");
  }

  async registerUser(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.render("admin/user/register", { erro: "Preecha todos os campos" });
    }

    const existsUser = await User.findOne({ email });

    if (existsUser) {
      return res.render("admin/user/register", { erro: "Usuáio não disponivel" });
    }

    const hashPassword = await bcrypt.hash(password, 8);

    const user = await User.create({
      username,
      email,
      password: hashPassword
    });

    user.password = undefined;

    return res.render("admin/user/login", { email });
  }

  loginForm(req, res) {
    return res.render("admin/user/login");
  }

  async loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.render("admin/user/login", { erro: "Preecha todos os campos" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.render("admin/user/login", { erro: "Usuário não existe" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.render("admin/user/login", { erro: "Senha inválida" });
    }

    const token = jwt.sign({ user_id: user._id }, jwt_secrete);
    res.cookie("@token", token);
    return res.redirect("/");
  }
}

module.exports = new LoginController