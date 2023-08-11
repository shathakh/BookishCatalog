const { serverErrs } = require("../helpers/customError");
const verifyToken = require("../helpers/verifyToken");

const authenticate = async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
    if (token) {
      try {
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
      } catch (err) {
        next(serverErrs.UNAUTHORIZED("unauthorized"));
      }
    }
  } else {
    next(serverErrs.UNAUTHORIZED("unauthorized"));
  }
};

module.exports = authenticate;
