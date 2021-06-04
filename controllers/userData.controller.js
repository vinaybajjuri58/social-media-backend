const getUserDetails = async (req, res) => {
  res.status(200).json({
    success: true,
    userData: req.user,
  });
};
module.exports = {
  getUserDetails,
};
