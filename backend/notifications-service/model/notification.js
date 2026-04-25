const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      enum: ["PENDING", "SENT"],
      default: "PENDING",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }, 
);

module.exports = mongoose.model("Notification", notificationSchema);
