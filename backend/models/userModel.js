import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
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
      type: String,
      enum: [
        "athina",
        "thessaloniki",
        "patras",
        "heraklion",
        "larissa",
        "volos",
      ],
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
    posts: [
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
