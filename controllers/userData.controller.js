const User = require("../models/User.model");
const { extend } = require("lodash");
const mongoose = require("mongoose");
const { imageUploadHandler } = require("../utils/imageUploadHandler");

const getUserDetails = async (req, res) => {
  const id = req.userId;
  try {
    const userData = await User.findById(id)
      .populate("notifications")
      .populate("posts")
      .populate({ path: "following", select: "userName name userImage" })
      .populate({ path: "followers", select: "userName name userImage" });
    res.status(200).json({
      success: true,
      userData,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in getting user data",
      errMessage: err.errMessage,
    });
  }
};

const updateUserDetails = async (req, res) => {
  let coverImageUrl = "",
    userImageUrl = "";
  const { bio, websiteUrl } = req.body;
  const id = req.userId;
  try {
    let userData = await User.findById(id);
    if (req.body.image) {
      userImageUrl = await imageUploadHandler(req.body.image);
      userData.userImage = userImageUrl;
    }
    if (req.body.coverImage) {
      coverImageUrl = await imageUploadHandler(req.body.coverImage);
      userData.coverImage = coverImageUrl;
    }
    userData = extend(userData, { bio, website: websiteUrl });
    await userData.save();
    res.status(201),
      json({
        success: true,
        message: "Updated userData successfully",
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in updating user details",
    });
  }
};

const getSpecificUserDetails = async (req, res) => {
  const { userId } = req.params;
  try {
    const userData = await User.findById(userId)
      .populate("posts")
      .populate({ path: "following", select: "userName name userImage" })
      .populate({ path: "followers", select: "userName name userImage" })
      .select("-password");
    res.status(200).json({
      success: true,
      userData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error in getting user data",
      errMessage: err.errMessage,
    });
  }
};

const followUser = async (req, res) => {
  const userData = req.user;
  const { userBId } = req.body;
  try {
    const userBData = await User.findById(userBId);
    userBData.followers.push(userData.id);
    userData.following.push(userBData.id);
    const session = await mongoose.startSession();
    session.startTransaction();
    await userBData.save({ session: session });
    await userData.save({ session: session });
    await session.commitTransaction();
    res.status().json({
      success: true,
      message: "Follow request successfull",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in following the user",
    });
  }
};

const unFollowUser = async (req, res) => {
  const userData = req.user;
  const { userBId } = req.body;
  try {
    const userBData = await User.findById(userBId);
    userBData.followers.pull(userData.id);
    userData.following.pull(userBData.id);
    const session = await mongoose.startSession();
    session.startTransaction();
    await userBData.save({ session: session });
    await userData.save({ session: session });
    await session.commitTransaction();
    res.status().json({
      success: true,
      message: "Un Follow request successfull",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in following the user",
    });
  }
};

module.exports = {
  getUserDetails,
  getSpecificUserDetails,
  followUser,
  unFollowUser,
};
