const express = require("express");
const userRouter = express.Router();
userRouter.route("/signup", userSignup);
userRouter.route("/login", userLogin);
