const ExpressWrapper = require("../../helpers/expressWraper");
const authenticate = require("../../middlewares/authenticate");
const user = require("./auth-get.action");
const { login, signup } = require("./auth-post.action");

module.exports = {
  "/login": {
    post: {
      action: ExpressWrapper(login),
      level: "public",
    },
  },
  "/signup": {
    post: {
      action: ExpressWrapper(signup),
      level: "public",
    },
  },
  "/user": {
    get: {
      middlewares: authenticate,
      action: ExpressWrapper(user),
      level: "public",
    },
  },
};
