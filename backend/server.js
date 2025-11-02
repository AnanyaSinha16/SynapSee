/*
All-in-one server.js supporting:
 - /api/ocr-upload  -> file upload -> OCR (images or text-PDF)
 - /api/chat        -> send text to selected AI provider (OPENAI, GEMINI, OLLAMA, NONE)

Gemini note: Google Generative Models API requires OAuth 2.0 access token (service account or OAuth client).
Set GEMINI_ACCESS_TOKEN in .env to a valid Bearer token (short-lived) or implement token exchange server-side.
This server includes a simple HTTP call template for Gemini using that access token.
*/
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Tesseract = require('tesseract.js');
const pdfParse = require('pdf-parse');
const { spawnSync } = require('child_process');
const fetch = require('node-fetch');
require('dotenv').config();

const { Configuration, OpenAIApi } = require('openai');

// env
const PORT = process.env.PORT || 4000;
const AI_MODE = (process.env.AI_MODE || 'NONE').toUpperCase();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const GEMINI_ACCESS_TOKEN = process.env.GEMINI_ACCESS_TOKEN;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'models/text-bison-001';
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '18mb' })); // accept reasonably large payloads

// Prepare OpenAI client if needed
let openai = null;
if (AI_MODE === 'OPENAI') {
  if (!OPENAI_API_KEY) console.warn('OPENAI_API_KEY missing in .env but AI_MODE=OPENAI');
  const configuration = new Configuration({ apiKey: OPENAI_API_KEY });
  openai = new OpenAIApi(configuration);
}

// uploads dir
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${unique}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage, limits: { fileSize: 40 * 1024 * 1024 } }); // 40 MB max

// Helpers
async function runImageOCR(filePath) {
  const worker = Tesseract.createWorker({
    logger: m => { /* optional logs */ }
  });
  try {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(filePath);
    await worker.terminate();
    return text || '';
  } catch (err) {
    try { await worker.terminate(); } catch(e) {}
    throw err;
  }
}

// Try convert PDF (scanned) to images using poppler (pdftoppm) if available
function convertPdfToImages(pdfPath) {
  // Requires poppler's pdftoppm to be installed on the host system.
  // Will produce files like output-1.png, output-2.png etc in a temp dir.
  const outDir = path.join(path.dirname(pdfPath), path.basename(pdfPath) + '_pages');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
  // pdftoppm -png input.pdf outprefix
  const outPrefix = path.join(outDir, 'page');
  const cmd = 'pdftoppm';
  try {
    const result = spawnSync(cmd, ['-png', pdfPath, outPrefix], { encoding: 'utf8' });
    if (result.status !== 0) {
      console.warn('pdftoppm failed:', result.stderr || result.stdout);
      return [];
    }
    // Gather produced images
    const imgs = fs.readdirSync(outDir).filter(f => /\.(png|jpg|jpeg)$/i.test(f)).map(f => path.join(outDir, f));
    return imgs;
  } catch (err) {
    console.warn('pdftoppm not available or failed:', err.message || err);
    return [];
  }
}

// OCR Upload endpoint
app.post('/api/ocr-upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const filePath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();

    // If PDF -> try extract text (text-based PDF)
    if (ext === '.pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(dataBuffer);
      if (pdfData && pdfData.text && pdfData.text.trim().length > 20) {
        const extracted = pdfData.text.trim();
        return res.json({ text: extracted, source: 'pdf-text' });
      }
      // else scanned PDF -> try convert pages to images and OCR them
      const pages = convertPdfToImages(filePath);
      if (pages.length > 0) {
        let combined = '';
        for (const p of pages) {
          const t = await runImageOCR(p);
          combined += '\n' + t;
        }
        return res.json({ text: combined.trim(), source: 'pdf-scanned' });
      } else {
        return res.status(500).json({ error: 'PDF appears scanned and pdftoppm conversion not available on server.' });
      }
    }

    // For images -> run OCR
    const text = await runImageOCR(filePath);
    res.json({ text: text || '', source: 'image-ocr' });
  } catch (err) {
    console.error('OCR error:', err);
    res.status(500).json({ error: 'OCR failed', details: err?.message || String(err) });
  }
});

// AI chat endpoint - accepts { text }
app.post('/api/chat', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'No text provided' });
    }
    const prompt = `User provided scanned text:\n\n${text}\n\nAnswer concisely and helpfully.`;

    if (AI_MODE === 'NONE') {
      return res.json({ reply: `OCR result (no AI mode enabled):\n\n${text}` });
    }

    if (AI_MODE === 'OPENAI') {
      if (!openai) return res.status(500).json({ error: 'OpenAI client not configured' });
      const resp = await openai.createChatCompletion({
        model: OPENAI_MODEL,
        messages: [
          { role: 'system', content: 'You are a helpful assistant that answers based on scanned text.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 600
      });
      const reply = resp.data.choices?.[0]?.message?.content || 'No reply';
      return res.json({ reply });
    }

    if (AI_MODE === 'GEMINI') {
      // Gemini / Google Generative Models HTTP template.
      // Requires a valid OAuth 2.0 access token with the Generative API scope.
      if (!GEMINI_ACCESS_TOKEN) return res.status(500).json({ error: 'GEMINI_ACCESS_TOKEN not set' });

      // Example endpoint (may vary by Google API version). This is a template using "predict" or "generateText".
      // You must consult Google GenAI docs for precise request shape. Here we use a generic call.
      const endpoint = `https://generativelanguage.googleapis.com/v1beta2/${GEMINI_MODEL}:generateText`;
      // Request body template (adjust model-specific fields as needed)
      const body = {
        prompt: {
          text: prompt
        },
        // adjust maxOutputTokens etc as supported by the model
        maxOutputTokens: 512
      };
      try {
        const r = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GEMINI_ACCESS_TOKEN}`
          },
          body: JSON.stringify(body)
        });
        const j = await r.json();
        // Response parsing will depend on exact API; we try several common fields
        const reply = j?.candidates?.[0]?.output || j?.output?.[0]?.content || JSON.stringify(j).slice(0, 1000);
        return res.json({ reply });
      } catch (err) {
        console.error('Gemini error:', err);
        return res.status(500).json({ error: 'Gemini request failed', details: err?.message || String(err) });
      }
    }

    if (AI_MODE === 'OLLAMA') {
      try {
        const url = `${OLLAMA_URL}/api/chat`;
        const body = {
          model: 'llama2', // change to your model name available in ollama
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: prompt }
          ]
        };
        const r = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
        const json = await r.json();
        const reply = json?.response || json?.choices?.[0]?.message?.content || JSON.stringify(json).slice(0, 1000);
        return res.json({ reply });
      } catch (err) {
        console.error('Ollama error:', err);
        return res.status(500).json({ error: 'Ollama request failed', details: err?.message || String(err) });
      }
    }

    return res.status(500).json({ error: 'Unknown AI_MODE' });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Chat failed', details: err?.message || String(err) });
  }
});

// Health
app.get('/', (req, res) => res.send({ status: 'ok', ai_mode: AI_MODE }));

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT} (AI_MODE=${AI_MODE})`));
