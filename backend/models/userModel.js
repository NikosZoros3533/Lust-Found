import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
      unique: true,
      minlength: 4,
      maxlength: 15,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: null,
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      default: null, // Add all cities as needed
    },
    selfDescription: {
      type: String,
      minlength: 5,
      maxlength: 200,
      default: null,
    },
    targetDescriptions: [
      {
        type: String,
        minlength: 5,
        maxlength: 200,
        default: [],
      },
    ],
    interestedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
export default User;
