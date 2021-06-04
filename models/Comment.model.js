const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const commentSchema = new Schema({
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
});
module.exports = mongoose.model("Comment", commentSchema);
