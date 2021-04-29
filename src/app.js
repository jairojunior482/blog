const express = require("express");
const cookieParser = require("cookie-parser");
const Handlebars = require("handlebars");
const handlebars = require("express-handlebars");
const { allowInsecurePrototypeAccess } =
  require("@handlebars/allow-prototype-access");
const path = require("path");
const dotenv = require("dotenv/config");

const database = require("./database");

const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.resolve(__dirname, "../public")));
app.use(cookieParser());

app.engine("hbs", handlebars({
  defaultLayout: path.resolve(__dirname, "../views/layouts/main"),
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  extname: ".hbs"
}));
app.set("view engine", "hbs");

app.use(routes);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});