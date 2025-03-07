import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    encounterDescription: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 200,
    },
    encounterCity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      default: null, 
    },
    encounterPoint: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    targetGender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    encounterDate: {
      type: Date,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    interests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    comments: [
      {
        text: {
          type: String,
          required: true,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;
