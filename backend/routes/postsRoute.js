import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  createPost,
  interestUninterestPost,
  commentOnPost,
  deletePost,
  updatePost,
  updateComment,
  deleteComment,
  getPostFeed,
  getLikedPosts,
  getPost,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/create", protectRoute, createPost);
router.post("/update-post/:id", protectRoute, updatePost);
router.delete("/delete-post/:id", protectRoute, deletePost);
router.post("/interest/:id", protectRoute, interestUninterestPost);
router.post("/comment/:id", protectRoute, commentOnPost);
router.post("/update-comment/:postId/:commentId", protectRoute, updateComment);
router.post("/delete-comment/:postId/:commentId", protectRoute, deleteComment);

router.get("/all", getPostFeed);
router.get("/:id", getPost);
router.get("/likedPosts", protectRoute, getLikedPosts);

export default router;
