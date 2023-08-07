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
    console.log(token, 'tokennnn');
    return { status: 200, msg: "logged in successfully", data: userData };
  };
  
  module.exports = { login};
  