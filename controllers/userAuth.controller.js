const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSignUp = async (req, res) => {
  const { email, name, password } = req.body;
  let userExists;
  if (!(email && password)) {
    return res
      .status(400)
      .send({ success: false, message: "Data not formatted properly" });
  }
  try {
    userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User Already exists with this particular email",
      });
    }
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });
    const savedUser = await newUser.save();
    res.status(200).json({
      success: true,
      message: "User registered Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error in registering new User",
    });
  }
};
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email: email });
    if (!userExists) {
      return res.status(500).json({
        success: false,
        message: "No user exists with this email",
      });
    }
    const validPassword = await bcrypt.compare(password, userExists.password);
    if (!validPassword) {
      return res.status(500).json({
        success: false,
        message: "Invalid User Credentials",
      });
    }
    const token = jwt.sign({ userId: userExists.id }, process.env.KEY, {
      expiresIn: "24h",
    });
    res.status(200).json({
      success: true,
      message: "loggedIn successfully",
      token: token,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in Login",
      errMessage: err.errMessage,
    });
  }
};
module.exports = {
  userSignUp,
  userLogin,
};
