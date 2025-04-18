import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import Notification from "../models/notification.js";

export const createPost = async (req, res) => {
  try {
    const {
      title,
      encounterDescription,
      encounterCity,
      encounterPoint,
      gender,
      targetGender,
      encounterDate,
    } = req.body;
    const userId = req.user._id.toString();
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }
    if (!title || !encounterDescription || !encounterCity) {
      return res.status(400).json({
        message: "An encounter must have title and description and city",
      });
    }
    const newPost = new Post({
      user: userId,
      title,
      encounterDescription,
      encounterCity,
      encounterPoint,
      gender,
      targetGender,
      encounterDate,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log("Error in createPost controller: ", error);
  }
};

export const updatePost = async (req, res) => {
  const {
    title,
    encounterDescription,
    encounterCity,
    encounterPoint,
    gender,
    targetGender,
  } = req.body;
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (post.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ error: "You are not authorized to update this post" });
    }
    post.title = title || post.title;
    post.encounterDescription =
      encounterDescription || post.encounterDescription;
    post.encounterCity = encounterCity || post.encounterCity;
    post.encounterPoint = encounterPoint || post.encounterPoint;
    post.gender = gender || post.gender;
    post.targetGender = targetGender || post.targetGender;
    await post.save();
    return res.status(200).json(post);
  } catch (error) {
    console.log("Error in updateComment: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (post.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ error: "You are not authorized to update this post" });
    }
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log("Error in deletePost controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const interestUninterestPost = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const userInterestPost = post.interests.includes(userId);

    if (userInterestPost) {
      //Uninterest Post
      await Post.updateOne({ _id: postId }, { $pull: { interests: userId } });
      await User.updateOne(
        { _id: userId },
        { $pull: { interestedPosts: postId } }
      );
      const updatedInterests = post.interests.filter(
        (id) => id.toString() !== userId.toString()
      );
      res.status(200).json(updatedInterests);
    } else {
      //Interest Post
      post.interests.push(userId);
      await User.updateOne(
        { _id: userId },
        { $push: { interestedPosts: postId } }
      );
      await post.save();
      const notification = new Notification({
        from: userId,
        on: post.user,
        type: "interest",
        onPostItemId: postId,
      });
      await notification.save();
      const updatedInterests = post.interests;
      res.status(200).json(updatedInterests);
    }
  } catch (error) {
    console.log("Error in interestUninterestPost controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const commentOnPost = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;
    if (!text) {
      return res.status(400).json({ error: "Text field is required" });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const comment = { user: userId, text };
    post.comments.push(comment);
    await post.save();

    const notification = new Notification({
      from: userId,
      on: post.user,
      type: "comment",
      onPostItemId: postId,
    });
    await notification.save();
    res.status(200).json(post);
  } catch (error) {
    console.log("Error in commentPost controller", error);
    res.status(500).json("Internal server error");
  }
};

export const updateComment = async (req, res) => {
  const { text } = req.body;
  const { postId, commentId } = req.params;
  const userId = req.user._id.toString();
  try {
    const post = await Post.findOne({ _id: postId, "comments._id": commentId });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const comment = post.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    if (comment.user.toString() !== userId) {
      return res
        .status(401)
        .json({ error: "You are not authorized to update this comment" });
    }
    comment.text = text || comment.text;
    await post.save();
    res.status(200).json(comment);
  } catch (error) {
    console.log("Error in updateComment controller", error);
    res.status(500).json("Internal server error");
  }
};

export const deleteComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const userId = req.user._id.toString();
  try {
    const post = await Post.findOne({ _id: postId });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const comment = post.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    if (comment.user.toString() !== userId) {
      return res
        .status(401)
        .json({ error: "You are not authorized to delete this comment" });
    }
    comment.deleteOne();
    await post.save();
    res.status(200).json({ message: "Comment deleted succesfully" });
  } catch (error) {
    console.log("Error in deleteComment controller", error);
    res.status(500).json("Internal server error");
  }
};

export const getPostFeed = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: "encounterCity", select: "City Region" })
      .populate({ path: "user", select: "nickname gender " })
      .populate({ path: "comments.user", select: "nickname gender" });
    if (posts.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(posts);
  } catch (error) {
    console.log("Error in getAllPosts controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate({ path: "encounterCity", select: "City Region" })
      .populate({ path: "user", select: "nickname gender " })
      .populate({ path: "comments.user", select: "nickname gender" });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    console.log("Error in getPost controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getLikedPosts = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const likedPosts = await Post.find({
      _id: { $in: user.interestedPosts },
    })
      .populate({ path: "user", select: "nickname gender" })
      .populate({ path: "comments.user", select: "nickname gender" });
    res.status(200).json(likedPosts);
  } catch (error) {
    console.log("Error in getLikedPosts controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
