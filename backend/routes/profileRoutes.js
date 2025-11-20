import express from "express";
import multer from "multer";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Upload folder
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Middleware to check JWT token
function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.json({ error: "Invalid token" });
  }
}

// Update profile picture
router.post(
  "/upload-profile",
  authMiddleware,
  upload.single("profilePic"),
  async (req, res) => {
    try {
      const imagePath = `/uploads/${req.file.filename}`;

      await User.findByIdAndUpdate(req.userId, {
        profilePic: imagePath,
      });

      res.json({ message: "Uploaded", profilePic: imagePath });
    } catch (err) {
      res.json({ error: err.message });
    }
  }
);

export default router;
