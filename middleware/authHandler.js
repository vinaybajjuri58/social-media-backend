const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const authValidator = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(500).json({
        success: false,
        message: "Users is not loggedIn",
      });
    }
    const { userId } = jwt.verify(token, process.env.KEY);
    const userData = await User.findById(userId).select("-password");
    if (!userData) {
      return res.status(500).json({
        success: false,
        message: "User doesnt exists",
      });
    }
    req.user = userData;
    req.userId = userData._id;
    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in getting userData",
    });
  }
};
module.exports = {
  authValidator,
};
