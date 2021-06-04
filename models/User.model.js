const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  name: {
    type: String,
    required: "username is required",
  },
  email: {
    type: String,
    required: "Email is required",
  },
  password: {
    type: String,
    required: "Password is required",
  },
  userImage: {
    type: String,
  },
  posts: [],
  likedPosts: [],
  comments: [],
});
module.exports = mongoose.model("User", userSchema);
