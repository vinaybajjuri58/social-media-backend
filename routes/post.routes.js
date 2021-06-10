const express = require("express");
const {
  getAllPosts,
  addPost,
  getSinglePost,
  getLikedUsers,
  likePost,
  dislikePost,
  deletePost,
} = require("../controllers/post.controller");
const { authValidator } = require("../middleware/authHandler");
const postRouter = express.Router();
postRouter.route("/").get(getAllPosts).post(authValidator, addPost);
postRouter
  .route("/:postId")
  .get(getSinglePost)
  .delete(authValidator, deletePost);
postRouter
  .route("/:postId/likes")
  .get(getLikedUsers)
  .post(authValidator, likePost)
  .delete(authValidator, dislikePost);
module.exports = {
  postRouter,
};
