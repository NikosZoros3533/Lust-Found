import Notification from "../models/notification.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const notifications = await Notification.find({ on: userId }).populate({
      path: "from",
      select: "nickname gender",
    });
    await Notification.updateMany({ to: userId }, { read: true });
    res.status(200).json(notifications);
  } catch (error) {
    console.log("Error in getNotifications function", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    await Notification.deleteMany({ on: userId });
    res.status(200).json({ message: "Notifications deleted succesfully" });
  } catch (error) {
    console.log("Error in deleteNotifications function", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const notifId = req.params.id;
    const userId = req.user._id;
    const notification = await Notification.findById(notifId);
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    if (notification.on.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ error: "You are allowed to delete this notification" });
    }
    await Notification.findByIdAndDelete(notifId);
    res.status(200).json({ message: "Notification deleted succesfully" });
  } catch (error) {
    console.log("Error in deleteNotification function", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
