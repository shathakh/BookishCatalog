const user = async (req) => {
  const user = req.user;
  return { status: 200, msg: "User Data", data: user };
};

module.exports = user;
