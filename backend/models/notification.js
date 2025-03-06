import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    on: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["interest", "comment"],
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
