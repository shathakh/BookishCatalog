const { verify } = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const { JWT_SECRET } = process.env;
const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    verify(token, JWT_SECRET, (err, match) => {
      if (err) return reject(err);
      return resolve(match);
    });
  });

module.exports = verifyToken;
