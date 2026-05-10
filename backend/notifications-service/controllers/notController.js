const notificationService = require("../services/notificationService");

exports.create = async (req, res) => {
  try {
    const notification = await notificationService.createNotification(req.body);
    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyNotifications = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    if (!userId) return res.status(400).json({ message: "User ID required" });

    const data = await notificationService.getUserNotifications(userId);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getByUser = async (req, res) => {
  try {
    const data = await notificationService.getUserNotifications(
      req.params.userId,
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.markRead = async (req, res) => {
  try {
    const data = await notificationService.markAsRead(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
