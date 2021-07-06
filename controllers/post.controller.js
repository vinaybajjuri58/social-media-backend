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

const deletePost = async (req, res) => {
  const { postId } = req.params;
  const user = req.user;
  try {
    const post = Post.findById(postId);
    const session = await mongoose.startSession();
    session.startTransaction();
    await post.remove({ session: session });
    user.posts.pull(postId);
    await user.save({ session: session });
    session.commitTransaction();
    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error in deleting the post",
    });
  }
};

const getSinglePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId)
      .populate({
        path: "userId",
        select: "userName name userImage",
      })
      .populate({
        path: "Comments",
        populate: {
          path: "userId",
          select: "userName name userImage",
        },
      });
    res.status(200).json({
      success: true,
      postData: post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in getting post data",
    });
  }
};

const getLikedUsers = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId).populate({
      path: "likes",
      select: "userName name userImage",
    });
    res.status(200).json({
      success: true,
      likedUsers: post.likes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "error in getting likes of user",
    });
  }
};

const likePost = async (req, res) => {
  const userId = req.userId;
  const { postId } = req.params;
  const userData = req.user;
  try {
    const postData = await Post.findById(postId);
    const session = await mongoose.startSession();
    session.startTransaction();
    postData.likes.push(userId);
    userData.likedPosts.push(postId);
    await userData.save({ session: session });
    await postData.save({ session: session });
    await session.commitTransaction();
    res.status(201).json({
      success: true,
      message: "Liked the post",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error occured",
      errMessage: err.errMessage,
    });
  }
};

const dislikePost = async (req, res) => {
  const userId = req.userId;
  const { postId } = req.params;
  const userData = req.user;
  try {
    const postData = await Post.findById(postId);
    const session = await mongoose.startSession();
    session.startTransaction();
    postData.likes.pull(userId);
    userData.likedPosts.pull(postId);
    await userData.save({ session: session });
    await postData.save({ session: session });
    await session.commitTransaction();
    res.status(201).json({
      success: true,
      message: "Disliked the post",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

module.exports = {
  getAllPosts,
  addPost,
  getSinglePost,
  getLikedUsers,
  likePost,
  dislikePost,
  deletePost,
};

// userId: userData._doc._id,
// ...userData._doc,
// postId: post.id,
// message: post.message,
// likes: post.likes,
// comments: normalisedComments,

// const normalisedComments = post.comments.map((comment) => {
//   const userData = comment.userId;
//   return {
//     userId: userData._doc._id,
//     ...userData._doc,
//     commentId: comment.id,
//     comment: comment.comment,
//     likes: comment.likes,
//   };
// });
