const express = require("express");
const userRouter = express.Router();
const { userSignUp, userLogin } = require("../controllers/user.controller");
userRouter.route("/signup").post(userSignUp);
userRouter.route("/login").post(userLogin);
module.exports = {
  userRouter,
};
