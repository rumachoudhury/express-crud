//bcrypt
const bcrypt = require("bcrypt");
const User = require("../model/UserModel");
const saltRounds = 10;

const signup = async (req, res) => {
  // destructuring newUser
  const { name, img, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = {
    name,
    img,
    email,
    password: hashedPassword,
  };
  const result = await User.create(newUser);
  res.send({
    data: result,
    status: 200,
    message: "User created successfuly",
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).send({ status: 404, message: "User not found" });
  }

  // console.log("User retrieved from DB:", user);

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  // console.log("Password match result:", isPasswordMatched);
  if (isPasswordMatched) {
    res.send({
      data: user,
      status: 200,
      message: "User logged successfuly",
    });
  } else {
    res.status(404).send({ status: 404, message: "Invalid Credential" });
  }
};

module.exports = {
  signup,
  signin,
};
