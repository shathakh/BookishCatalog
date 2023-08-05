const ExpressWrapper = require("../../helpers/expressWraper");
const logout = require("./auth-get.action");
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
  "/logout": {
    get: {
      action: ExpressWrapper(logout),
      level: "public",
    },
  },
};
