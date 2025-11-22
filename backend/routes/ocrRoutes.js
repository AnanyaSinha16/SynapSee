// routes/ocrRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { createWorker } from "tesseract.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// configure multer to save files to uploads/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.round(Math.random()*1e9)}${ext}`;
    cb(null, name);
  }
});
const upload = multer({ storage });

const router = express.Router();

// POST /api/ocr/upload-and-scan
// Field name: 'image'
router.post("/upload-and-scan", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No image uploaded" });

    const publicUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    // run tesseract OCR (optional)
    // (tesseract.js server usage can be memory-heavy; if it's too slow you can skip server OCR)
    const worker = createWorker({
      logger: m => { /* console.log(m) */ } // optional logging
    });

    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");

    const { data: { text } } = await worker.recognize(req.file.path);

    await worker.terminate();

    return res.json({ url: publicUrl, text });
  } catch (err) {
    console.error("OCR error:", err);
    return res.status(500).json({ error: "OCR failed", detail: err.message });
  }
});

// POST /api/ocr/upload-only  -> just save file and return URL (no OCR)
router.post("/upload-only", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No image uploaded" });
  const publicUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  return res.json({ url: publicUrl });
});

export default router;
