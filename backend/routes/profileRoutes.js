import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";
import User from "../models/User.js";

const router = express.Router();

// Upload Profile Photo
router.post("/upload", authMiddleware, upload.single("profilePic"), async (req, res) => {
  const filePath = req.file.filename;

  await User.findByIdAndUpdate(req.user, { profilePic: filePath });

  res.json({
    message: "Profile updated",
    profilePic: filePath
  });
});

// Get user profile
router.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user);
  res.json(user);
});

export default router;
