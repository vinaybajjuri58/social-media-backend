const express = require("express");
const { getAllPosts } = require("../controllers/post.controller");
const postRouter = express.Router();
postRouter.route("/").get(getAllPosts);
// .post(addPost);
// postRouter.route("/:postId").get(singlePost).delete(deletePost);
module.exports = {
  postRouter,
};
