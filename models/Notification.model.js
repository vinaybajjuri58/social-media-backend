const mongoose = require("mongoose");
const { Schema } = mongoose;
const opts = { toJSON: { virtuals: true } };
const notificationSchema = new Schema(
  {
    message: {
      type: String,
      required: "Notification should have a message",
    },
  },
  opts
);
module.exports = mongoose.model("Notification", notificationSchema);
