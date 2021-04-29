const jwt= require("jsonwebtoken");

const User = require("../models/User");

const jwt_secrete = process.env.JWT_SECRETE;

class LoginController {
  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render("user/login", { erro: "Preecha todos os campos" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.render("user/login", { erro: "Usuário ou senha inválida" });
    }

    const token = jwt.sign({ user_id: user._id }, jwt_secrete);

    res.cookie("@token", token);

    user.password = undefined;

    return res.redirect("/");
  }
}

module.exports = new LoginController