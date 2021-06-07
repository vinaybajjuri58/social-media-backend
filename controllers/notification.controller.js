const User = require("../models/User.model");
const getNotifications = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      notifications: req.user.notifications,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "error in getting notifications data",
      errMessage: err.errMessage,
    });
  }
};
module.exports = {
  getNotifications,
};
