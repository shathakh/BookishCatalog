const { serverErrs } = require("../helpers/customError");
const generateToken = require("../helpers/jwt");
const { User } = require("../models");
const { signupValidation } = require("../validation");
const { compare, hash } = require("bcrypt");

const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  await signupValidation.validate({ firstName, lastName, email, password });

  const user = await User.findOne({
    where: { email },
  });

  if (user) throw serverErrs.BAD_REQUEST("email is already used");
  const hashedPassword = await hash(password, 12);

  const newUser = await User.create(
    {
      firstName, lastName, email, password: hashedPassword,
    },
    {
      returning: true,
    },
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

module.exports = signup;
