require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createWorker } = require('tesseract.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const upload = multer({ dest: path.join(__dirname, 'uploads/') });

const worker = createWorker();

const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(()=> console.log('MongoDB connected'))
  .catch(err => console.error(err));

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String
});
const User = mongoose.model('User', UserSchema);

const OCRSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  filename: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});
const OCRResult = mongoose.model('OCRResult', OCRSchema);

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'Missing token' });
  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

app.post('/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: 'Email exists' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid login' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(400).json({ error: 'Invalid login' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/ocr', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');

    const filepath = req.file.path;
    const { data: { text } } = await worker.recognize(filepath);

    const ocr = await OCRResult.create({
      user: req.userId,
      filename: req.file.filename,
      text
    });

    res.json({
      text,
      fileUrl: '/uploads/' + req.file.filename
    });
  } catch (err) {
    res.status(500).json({ error: 'OCR failed' });
  }
});

app.get('/results', authMiddleware, async (req, res) => {
  const results = await OCRResult.find({ user: req.userId }).sort({ createdAt: -1 });
  res.json(results);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server running on ' + PORT));
