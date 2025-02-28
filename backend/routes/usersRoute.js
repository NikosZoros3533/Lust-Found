import express from "express";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/all", getUsers);

router.get("/:id", getUser);

// router.post("/", createUserProfile);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
