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
postRouter.route("/").get(getAllPosts);
postRouter.route("/:postId").get(getSinglePost);
postRouter.route("/:postId/likes").get(getLikedUsers);
postRouter.use(authValidator);
postRouter.route("/").post(addPost);
postRouter.route("/:postId").delete(deletePost);
postRouter.route("/:postId/likes").post(likePost).delete(dislikePost);
module.exports = {
  postRouter,
};
