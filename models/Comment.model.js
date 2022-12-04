const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const opts = { toJSON: { virtuals: true } };
const commentSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: "User Id is required",
    },
    comment: {
      type: String,
      required: "Please add comment",
    },
    postId: {
      type: Types.ObjectId,
      required: "PostId is required",
    },
    likes: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
  },
  opts
);
module.exports = mongoose.model("Comment", commentSchema);
