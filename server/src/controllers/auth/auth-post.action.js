const { compare, hash } = require("bcrypt");
const { User } = require("../../models");
const { loginValidation, signupValidation } = require("../../validation");
const { serverErrs } = require("../../helpers/customError");
const generateToken = require("../../helpers/jwt");

const signup = async (req, res) => {
  console.log(req.body, "reqqqq");
  const { firstName, lastName, email, password } = req.body;
  await signupValidation.validate({ firstName, lastName, email, password });

  const user = await User.findOne({
    where: { email },
  });

  if (user) throw serverErrs.BAD_REQUEST("email is already used");
  const hashedPassword = await hash(password, 12);

  const newUser = await User.create(
    {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
    {
      returning: true,
    }
  );

  const userData = {
    id: newUser.id,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
  };

  const token = await generateToken(userData);
  res.cookie("token", token);

  return { status: 201, data: userData, msg: "signed up successfully " };
};

const login = async (req, res) => {
  const { email, password } = req.body;
  await loginValidation.validate({ email, password });

  const user = await User.findOne({ where: { email } });
  if (!user) throw serverErrs.BAD_REQUEST("Wrong Email Or Password");
  const result = await compare(password, user.password);
  if (!result) throw serverErrs.BAD_REQUEST("Wrong Email Or Password");

  const userData = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
  const token = await generateToken(userData);
  res.cookie("token", token);
  return { status: 200, msg: "logged in successfully", data: userData };
};

module.exports = { login, signup };
