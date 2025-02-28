import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 20,
    },
    encounterDescription: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 200,
    },
    encounterCity: {
      type: String,
      enum: ["athens", "thessaloniki", "patras", "heraklion", "larissa"],
      required: true,
    },
    encounterPoint: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    targetGender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    encounterDate: {
      type: Date,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;
