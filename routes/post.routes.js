const express = require("express");
const { getAllPosts, addPost } = require("../controllers/post.controller");
const { authValidator } = require("../middleware/authHandler");
const postRouter = express.Router();
postRouter.route("/").get(getAllPosts).post(authValidator, addPost);
// postRouter.route("/:postId").get(singlePost).delete(deletePost);
module.exports = {
  postRouter,
};
