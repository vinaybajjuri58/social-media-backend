const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const opts = { toJSON: { virtuals: true } };
const userSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: "Add a userName",
    },
    name: {
      type: String,
      required: "username is required",
    },
    email: {
      type: String,
      required: "Email is required",
    },
    website: {
      type: String,
    },
    bio: {
      type: String,
    },
    password: {
      type: String,
      required: "Password is required",
    },
    userImage: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    posts: [
      {
        type: Types.ObjectId,
        ref: "Post",
      },
    ],
    likedPosts: [
      {
        type: Types.ObjectId,
        ref: "Post",
      },
    ],
    comments: [
      {
        type: Types.ObjectId,
        ref: "Comment",
      },
    ],
    followers: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    notifications: [
      {
        type: Types.ObjectId,
        ref: "Notification",
      },
    ],
  },
  opts
);
module.exports = mongoose.model("User", userSchema);
