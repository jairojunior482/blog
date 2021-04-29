const jwt = require("jsonwebtoken");

const User = require("../models/User");

async function AuthMiddleware(req, res, next) {
  const token = req.cookies["@token"];

  if (!token) {
    return res.render("user/login", { erro: "Token não encontrado" });
  }

  const jwt_secrete = process.env.JWT_SECRETE;

  try {
    const decode = jwt.verify(token, jwt_secrete);
    const user = await User.findOne({ _id: decode.user_id });
    if (!user.is_admin) {
      return res.redirect("/");
    }
    req.user_id = decode.user_id;
    return next();
  } catch (erro) {
    return res.redirect("/");
  }
}

module.exports = AuthMiddleware