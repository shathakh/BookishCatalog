const {users, books} = require("./fakeData");
const sequelize = require("./connection");
const {User, Book} = require("../../models")

const insertDB = async () => {
  await sequelize.sync({ force: true });
  await User.bulkCreate(users);
  await Book.bulkCreate(books);
};

if (process.env.SEED) {
  insertDB();
}

module.exports= insertDB;
