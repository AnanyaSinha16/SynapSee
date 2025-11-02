# Camera-OCR-Chatbot (Full Package)

This package includes:
- Backend (Node.js + Express) with OCR and multi-AI support (OpenAI, Gemini template, Ollama)
- Frontend (React + Vite) with Upload/Drag&Drop and optional camera
- Dockerfiles and docker-compose for easy deployment
- PDF -> image conversion support using `pdftoppm` (poppler) if installed on the host

## Quick start (development)

### 1) Install Node.js (18+) and npm

### 2) Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env to set AI_MODE and API keys (OPENAI_API_KEY or GEMINI_ACCESS_TOKEN or OLLAMA_URL)
npm run dev
```

### 3) Frontend
```bash
cd frontend
npm install
npm run dev

```

## Docker (recommended for simple deploy)
Make sure to set environment variables in your shell or a .env file, then:
```bash
docker-compose up --build
```
This will build backend and frontend containers. 

## Gemini (Google) setup notes
Google Generative Models API requires OAuth 2.0 access token. Two common approaches:
1. Use a service account and `gcloud auth application-default print-access-token` to obtain a token and set `GEMINI_ACCESS_TOKEN` temporarily, OR
2. Implement server-side OAuth using google-auth-library to mint short-lived tokens programmatically.

This project includes a **template** that calls the Gemini HTTP endpoint using `GEMINI_ACCESS_TOKEN`. You'll need to follow Google's GenAI docs to obtain the token and set it into `.env`.

## Poppler / pdftoppm (scanned PDF support)
To convert scanned PDFs (images inside PDF) to images, the server attempts to call `pdftoppm` (poppler). Install:
- **Ubuntu / Debian**: `sudo apt update && sudo apt install -y poppler-utils`
- **macOS** (Homebrew): `brew install poppler`
- **Windows**: install poppler binaries and add to PATH

If `pdftoppm` is not available, scanned PDFs will return an error asking to convert pages to images.

## Security
- Do NOT commit `.env` with API keys.
- This is a dev/demo setup. Harden CORS, auth, rate-limits for production.

## What I added for you on request
A) Gemini template (HTTP request) — requires valid access token (see Google Cloud docs).  
B) Poppler (pdftoppm) conversion support is integrated (server tries pdftoppm if scanned PDF detected).  
C) This entire project is packed in a ZIP you can download (camera-ocr-chatbot.zip).  
D) Dockerfiles + docker-compose included.

Enjoy —> run locally and test upload -> OCR -> AI reply flow.
