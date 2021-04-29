async function AuthMiddleware(req, res, next) {
  const hash = req.cookies["@register"];

  if (!hash) {
    return res.redirect("/");
  }

  if (hash != "nodeblog") {
    return res.redirect("/");
  }

  next();
}

module.exports = AuthMiddleware