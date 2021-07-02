const express = require("express");
const userRouter = express.Router();
const { userSignUp, userLogin } = require("../controllers/userAuth.controller");
const {
  getUserDetails,
  getSpecificUserDetails,
  updateUserDetails,
  unFollowUser,
  followUser,
} = require("../controllers/userData.controller");
const { authValidator } = require("../middleware/authHandler");

userRouter.route("/signup").post(userSignUp);
userRouter.route("/login").post(userLogin);
userRouter.route("/follow").post(followUser).delete(unFollowUser);
userRouter.route("/:userId").get(getSpecificUserDetails);
userRouter.use(authValidator);
userRouter.route("/").get(getUserDetails).post(updateUserDetails);
module.exports = {
  userRouter,
};
