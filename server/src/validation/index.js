const yup = require("yup");

const signupValidation = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});

const loginValidation = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});

const queryBookValidation = yup.object().shape({
  id: yup.number(),
});

const addBookValidation = yup.object().shape({
  author: yup.string().required(),
  title: yup.string().required(),
  description: yup.string().required(),
  imageLink: yup.string().required(),
});

const editBookValidation = yup.object().shape({
  author: yup.string(),
  title: yup.string(),
  description: yup.string(),
  imageLink: yup.string(),
});

const searchBookValidation = yup.object().shape({
  author: yup.string(),
  title: yup.string(),
});

module.exports = {
  signupValidation,
  loginValidation,
  queryBookValidation,
  addBookValidation,
  searchBookValidation,
  editBookValidation
};
