const Notification = require("../model/notification");

exports.createNotification = async (data) => {
  return await Notification.create(data);
};

exports.getUserNotifications = async (userId) => {
  return await Notification.find({ userId }).sort({ createdAt: -1 });
};

exports.markAsRead = async (id) => {
  return await Notification.findByIdAndUpdate(
    id,
    { isRead: true },
    { new: true },
  );
};
