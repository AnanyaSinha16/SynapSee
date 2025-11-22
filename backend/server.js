// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";

import ocrRoutes from "./routes/ocrRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
await connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// serve uploads folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Test route working!" });
});

app.use("/api/ocr", ocrRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
