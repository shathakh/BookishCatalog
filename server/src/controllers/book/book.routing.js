const ExpressWrapper = require("../../helpers/expressWraper");
const authenticate = require("../../middlewares/authenticate");
const { getBooks, searchBooks } = require("./book-get.action");
const { deleteBook, editBookInfo, addBook } = require("./book-post.action");

module.exports = {
  "/:id": {
    get: {
      middlewares: authenticate,
      action: ExpressWrapper(getBooks),
      level: "public",
    },
    delete: {
      middlewares: authenticate,
      action: ExpressWrapper(deleteBook),
      level: "public",
    },
    put: {
      middlewares: authenticate,
      action: ExpressWrapper(editBookInfo),
      level: "public",
    },
  },
  "/": {
    get: {
      middlewares: authenticate,
      action: ExpressWrapper(searchBooks),
      level: "public",
    },
    post: {
      middlewares: authenticate,
      action: ExpressWrapper(addBook),
      level: "public",
    },
  },
};
