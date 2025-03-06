import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getUserProfile,updateUserProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/profile/:nickname", protectRoute, getUserProfile);
router.post("/update", protectRoute, updateUserProfile);

export default router;
