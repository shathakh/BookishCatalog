const { serverErrs } = require("../helpers/customError");
const verifyToken = require("../helpers/verifyToken");

const authenticate = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const user = await verifyToken(token);
    if (user) {
      req.user = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
      next();
    }
  } else {
    next(serverErrs.UNAUTHORIZED("unauthorized"));
  }
};

module.exports = authenticate;
