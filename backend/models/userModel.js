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
      required: true,
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
      ], // Add all cities as needed
      required: true,
    },
    selfDescription: {
      type: String,
      minlength: 5,
      maxlength: 200,
    },
    targetDescriptions: [
      {
        type: String,
        minlength: 5,
        maxlength: 200,
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", UserSchema);


