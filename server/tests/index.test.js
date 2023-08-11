const insertDB = require("../src/db/config/build");
const sequelize = require("../src/db/config/connection");
const AuthTests = require("./auth.test");
const BookTests = require("./books.test");

beforeAll(() => insertDB());
afterAll(() => sequelize.close());

describe("Auth APIs", AuthTests);
describe("Book APIs", BookTests);
