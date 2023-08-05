const express = require("express");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const morgan = require("morgan");
const dotenv = require("dotenv");
const login = require('./controllers/login');
const cors = require('cors');
const signup = require("./controllers/signup");
const { clientError, serverError } = require("./middlewares/error");

dotenv.config();
const app = express();
app.set("port", process.env.PORT || 3500);
app.use(cors());

app.use([
  express.json(),
  cookieParser(),
  compression(),
  express.urlencoded({ extended: false }),
]);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.post('/login', login)
app.post('/signup', signup)

app.use(clientError);
app.use(serverError);

module.exports = app;

