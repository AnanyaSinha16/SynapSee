import express from "express";
import upload from "../middleware/upload.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/upload-profile", upload.single("profile"), async (req, res) => {
    try {
        const userId = req.body.userId;
        const imagePath = req.file.filename;

        await User.findByIdAndUpdate(userId, {
            profileImage: imagePath,
        });

        res.json({
            success: true,
            imageUrl: `http://localhost:5000/${imagePath}`,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Upload failed" });
    }
});

export default router;
