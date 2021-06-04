const mongoose = require("mongoose");
const { Schema } = mongoose;
const notificationSchema = new Schema({
  message: {
    type: String,
    required: "Notification should have a message",
  },
});
module.exports = mongoose.model("Notification", notificationSchema);
