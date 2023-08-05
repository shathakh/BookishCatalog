const express = require("express");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require('cors');
const { clientError, serverError } = require("./middlewares/error");
// const ExpressWrapper = require("./helpers/expressWraper");
// const { login, signup } = require("./controllers/authentication");
const lumie = require("lumie");
const path = require("path");


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
lumie.load(app, {
  preURL: "api",
  verbose: true,
  ignore: ["*.spec", "*.action"],
  controllers_path: path.join(__dirname,"controllers")
});

// app.post('/login',ExpressWrapper(login))
// app.post('/signup', ExpressWrapper(signup))

app.use(clientError);
app.use(serverError);

module.exports = app;

