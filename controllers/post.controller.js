const Post = require("../models/Post.model");
const mongoose = require("mongoose");
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate({
      path: "userId",
      select: "userName name userImage",
    });
    const normalizedPosts = posts.map((post) => {
      const userData = post.userId;
      return {
        userId: userData._doc._id,
        ...userData._doc,
        postId: post.id,
        message: post.message,
        likes: post.likes,
        comments: post.comments,
      };
    });
    res.status(200).json({
      success: true,
      posts: normalizedPosts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in getting Posts",
      errMessage: err.errMessage,
    });
  }
};
const addPost = async (req, res) => {
  const { message } = req.body;
  const user = req.user;
  try {
    const newPost = new Post({
      userId: user.id,
      message: message,
      likes: [],
      comments: [],
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    const savedPost = await newPost.save({ session: session });
    user.posts.push(savedPost.id);
    await user.save({ session: session });
    session.commitTransaction();
    res.status(201).json({
      success: true,
      message: "added a new post",
      savedPost,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error in saving the post",
    });
  }
};
module.exports = {
  getAllPosts,
  addPost,
};
