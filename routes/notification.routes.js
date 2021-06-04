const express = require("express");
const notificationRouter = express.Router();
notificationRouter.route("/").get(getAllNotifications);
module.exports = {
  notificationRouter,
};
