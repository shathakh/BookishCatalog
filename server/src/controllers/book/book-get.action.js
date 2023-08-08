const { Book } = require("../../models");
const { queryBookValidation, searchBookValidation } = require("../../validation");
const { Op } = require("sequelize");

const getBooks = async (req) => {
  const { id } = req.params;
  await queryBookValidation.validate(req.params);
  console.log("heelo from back");
  const books = await Book.findAll({
    where: {
      userId: id,
    },
    order: [['createdAt', 'DESC']],
  });
  console.log(books, "bokkkkk");
  if (books.length == 0){
    return { status: 200, msg: "There is No Books" };
  }else 
  return { status: 200, data: books };
};

const searchBooks = async (req) => {
    const JOBS_PER_PAGE = 10;
    const { searchText } = req.query;
    const userId = req.user.id;
    console.log(searchText, 'search Text');
    await searchBookValidation.validate(req.query);
  
    const books = await Book.findAndCountAll({
      attributes: ["id", "title", "description", "author", "imageLink", "userId"],
      where: {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${searchText}%`,
            },
          },
          {
            author: {
              [Op.iLike]: `%${searchText}%`,
            },
          },
        ],
        userId
      },
      order: [["id", "DESC"]],
      distinct: true,
      limit: JOBS_PER_PAGE,
    });
    return { status: 200, data: books };
  };
  
module.exports = {getBooks, searchBooks};
