const express = require("express");
const {
  addComment,
  likeComment,
  dislikeComment,
} = require("../controllers/comment.controller");
const commentRouter = express.Router();
commentRouter.route("/post/:postId").post(addComment);
commentRouter
  .route("/:commentId/likes")
  .post(likeComment)
  .delete(dislikeComment);
module.exports = {
  commentRouter,
};
