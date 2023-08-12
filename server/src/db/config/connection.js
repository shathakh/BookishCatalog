const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();
const { NODE_ENV, DEV_DATABASE_URL, TEST_DATABASE_URL } = process.env;

let url;
let ssl = false;
switch (NODE_ENV) {
  case "development":
    url = DEV_DATABASE_URL;
    break;
  case "test":
    url = TEST_DATABASE_URL;
    break;
  default:
    throw new Error("NODE_ENV is not set");
}

if (!url) throw new Error("NODE_ENV is not set");
const sequelize = new Sequelize(url, {
  logging: false,
  dialect: "postgres",
  dialectOptions: {
    ssl,
  },
});

module.exports = sequelize;
