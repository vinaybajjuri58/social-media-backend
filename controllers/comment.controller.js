const Post = require("../models/Post.model");
const Comment = require("../models/Comment.model");
const mongoose = require("mongoose");

const addComment = async (req, res) => {
  const userId = req.userId;
  const user = req.user;
  const { postId } = req.params;
  const { comment } = req.body;
  try {
    const post = await Post.findById(postId);
    const newComment = new Comment({ userId, postId, comment, likes: [] });
    const session = await mongoose.startSession();
    session.startTransaction();
    const savedComment = await newComment.save({ session: session });
    post.comments.push(savedComment._id);
    user.comments.push(savedComment._id);
    await post.save({ session: session });
    await user.save({ session: session });
    await session.commitTransaction();
    res.status(201).json({
      success: true,
      comment: savedComment,
      userId: {
        name: user.name,
        id: user._id,
        id: user.id,
        userName: user.userName,
        userImage: user.userImage,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error in adding comment",
    });
  }
};

const likeComment = async (req, res) => {
  const userId = req.userId;
  const { commentId } = req.params;
  try {
    const comment = await Comment.findById(commentId);
    comment.likes.push(userId);
    await comment.save();
    res.status(201).json({
      success: true,
      message: "liked the comment",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in liking the comment",
    });
  }
};

const dislikeComment = async (req, res) => {
  const userId = req.userId;
  const { commentId } = req.params;
  try {
    const comment = await Comment.findById(commentId);
    comment.likes.pull(userId);
    await comment.save();
    res.status(201).json({
      success: true,
      message: "liked the comment",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in liking the comment",
    });
  }
};

module.exports = {
  addComment,
  likeComment,
  dislikeComment,
};
