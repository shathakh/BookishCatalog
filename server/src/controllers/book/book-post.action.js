const { serverErrs } = require("../../helpers/customError");
const { Book } = require("../../models");
const {
  addBookValidation,
  queryBookValidation,
  editBookValidation,
} = require("../../validation");

const addBook = async (req, res) => {
  const { author, title, description, imageLink } = req.body;
  const userId = req.user.id;
  await addBookValidation.validate({
    author,
    title,
    description,
    imageLink,
  });

  const book = await Book.create({
    author,
    title,
    description,
    imageLink,
    userId,
  });

  return { status: 201, data: book };
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  console.log(id, 'iddddd');
  const userId = req.user.id;
  await queryBookValidation.validate(req.params);
  const book = await Book.findByPk(id);
  if (!book) {
    throw serverErrs.BAD_REQUEST("book not found");
  }
  if (userId === book.userId) {
    await book.destroy();
    return { status: 200, msg: "book deleted" };
  }
  throw serverErrs.UNAUTHORIZED("you are not authorized");
};

const editBookInfo = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { author, title, description, imageLink } = req.body;
  await editBookValidation.validate({
    author,
    title,
    description,
    imageLink,
  });
  const book = await Book.findByPk(id);
  if (!book) throw serverErrs.BAD_REQUEST("book not found");
  if (book?.userId !== userId) throw serverErrs.UNAUTHORIZED("unauthorized");
  const updatedBook = await Book.update(
    {
      author,
      title,
      description,
      imageLink,
    },
    {
      where: {
        id,
      },
      returning: true,
    }
  );
  return { status: 200, data: updatedBook, msg: "updated" };
};

module.exports = { addBook, deleteBook, editBookInfo };
