const express = require("express");
const notificationRouter = express.Router();
const { getNotifications } = require("../controllers/notification.controller");
notificationRouter.route("/").get(getNotifications);
module.exports = {
  notificationRouter,
};
