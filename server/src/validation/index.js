const yup = require('yup');

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

module.exports ={signupValidation, loginValidation}