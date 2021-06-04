const express = require("express");
const userRouter = express.Router();
const { userSignUp, userLogin } = require("../controllers/userAuth.controller");
userRouter.route("/signup").post(userSignUp);
userRouter.route("/login").post(userLogin);
userRouter.route("/follow").post(followUser).delete(unFollowUser);
module.exports = {
  userRouter,
};
