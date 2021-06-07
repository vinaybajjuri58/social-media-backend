const Post = require("../models/Post.model");
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate({
      path: "userId",
      select: "userName name userImage",
    });
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in getting Posts",
      errMessage: err.errMessage,
    });
  }
};
module.exports = {
  getAllPosts,
};
