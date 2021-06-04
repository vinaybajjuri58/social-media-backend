const express = require("express");
const postRouter = express.Router();
postRouter.route("/").get(getAllPosts).post(addPost);
postRouter.route("/:postId").get(singlePost).delete(deletePost);
module.exports = {
  postRouter,
};
