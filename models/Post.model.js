const mongoose = require("mongoose");
const { Schema } = mongoose;
const opts = { toJSON: { virtuals: true } };
const postSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: "UserId is required",
  },
  message: {
    type: String,
    required: "Add some text",
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
  ],
});
module.exports = mongoose.model("Post", postSchema);
