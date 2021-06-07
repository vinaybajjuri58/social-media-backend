const User = require("../models/User.model");
const getUserDetails = async (req, res) => {
  const id = req.userId;
  try {
    const userData = await User.findById(id)
      .populate("notifications")
      .populate("posts")
      .populate({ path: "following", select: "userName name userImage" })
      .populate({ path: "followers", select: "userName name userImage" });
    res.status(200).json({
      success: true,
      userData,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in getting user data",
      errMessage: err.errMessage,
    });
  }
};
const getSpecificUserDetails = async (req, res) => {
  const { userId } = req.params;
  try {
    const userData = await User.findById(userId)
      .populate("posts")
      .populate({ path: "following", select: "userName name userImage" })
      .populate({ path: "followers", select: "userName name userImage" })
      .select("-password");
    res.status(200).json({
      success: true,
      userData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error in getting user data",
      errMessage: err.errMessage,
    });
  }
};
module.exports = {
  getUserDetails,
  getSpecificUserDetails,
};
