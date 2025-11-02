import React, { useEffect, useRef, useState } from 'react';
import UploadOcr from './components/UploadOcr';

export default function App() {
  const [ocrText, setOcrText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Camera refs for mobile live camera (optional)
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [streamStarted, setStreamStarted] = useState(false);

  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(t => t.stop());
      }
    };
  }, []);

  const sendToAI = async (text) => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'AI call failed');
      return json.reply;
    } catch (err) {
      console.error(err);
      return `Error: ${err.message || err}`;
    } finally {
      setLoading(false);
    }
  };

  // Handler when UploadOcr returns extracted text
  const onUploadResult = async (text) => {
    setOcrText(text);
    if (!text) return;
    setChatHistory(prev => [...prev, { role: 'user', content: text }]);
    const reply = await sendToAI(text);
    setChatHistory(prev => [...prev, { role: 'assistant', content: reply }]);
  };

  const handleSendMessage = async () => {
    if (!userInput) return;
    setChatHistory(prev => [...prev, { role: 'user', content: userInput }]);
    setUserInput('');
    const reply = await sendToAI(userInput);
    setChatHistory(prev => [...prev, { role: 'assistant', content: reply }]);
  };

  // Optional: start camera for mobile live scanning (if you want)
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setStreamStarted(true);
    } catch (err) {
      alert('Camera access denied or not available');
      console.error(err);
    }
  };

  const captureFrame = () => {
    const v = videoRef.current;
    const c = canvasRef.current;
    if (!v || !c) return null;
    c.width = v.videoWidth || 640;
    c.height = v.videoHeight || 480;
    const ctx = c.getContext('2d');
    ctx.drawImage(v, 0, 0, c.width, c.height);
    return c.toDataURL('image/png');
  };

  return (
    <div className="container">
      <h1>Camera-OCR Chatbot (Laptop Upload + Mobile Camera)</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 12 }}>
        <div className="card">
          <h3>Laptop Mode — Upload / Drag & Drop</h3>
          <UploadOcr onResult={onUploadResult} />
          <div style={{ marginTop: 12 }}>
            <h4>Scanned Text</h4>
            <textarea rows={10} value={ocrText} onChange={e => setOcrText(e.target.value)} />
          </div>
        </div>

        <div className="card">
          <h3>Chat</h3>
          <div style={{ height: 350, overflow: 'auto', border: '1px solid #eee', padding: 8, borderRadius: 6 }}>
            {chatHistory.length === 0 && <div style={{ color: '#777' }}>No conversation yet.</div>}
            {chatHistory.map((m, i) => (
              <div key={i} style={{ textAlign: m.role === 'user' ? 'right' : 'left', marginBottom: 8 }}>
                <div style={{ display: 'inline-block', padding: 8, borderRadius: 6, background: m.role === 'user' ? '#e6f0ff' : '#f5f5f5' }}>
                  {m.content}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
            <input value={userInput} onChange={e => setUserInput(e.target.value)} placeholder="Ask something..." />
            <button className="primary" onClick={handleSendMessage} disabled={loading}>Send</button>
          </div>
          {loading && <div style={{ marginTop: 8 }}>Waiting for AI...</div>}
        </div>
      </div>

      <div style={{ marginTop: 18 }} className="card">
        <h3>Optional Mobile Camera Mode</h3>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <video ref={videoRef} style={{ width: '100%', background: '#000' }} autoPlay muted playsInline />
            <div style={{ marginTop: 8 }}>
              {!streamStarted ? <button onClick={startCamera}>Start Camera</button> :
                <button onClick={async () => {
                  const dataUrl = captureFrame();
                  if (!dataUrl) return;
                  const res = await fetch(dataUrl);
                  const blob = await res.blob();
                  const file = new File([blob], 'capture.png', { type: 'image/png' });
                  const form = new FormData();
                  form.append('file', file);
                  try {
                    const r = await fetch('http://localhost:4000/api/ocr-upload', { method: 'POST', body: form });
                    const json = await r.json();
                    if (!r.ok) throw new Error(json?.error || 'Upload failed');
                    setOcrText(json.text || '');
                    setChatHistory(prev => [...prev, { role: 'user', content: json.text || '' }]);
                    const reply = await sendToAI(json.text || '');
                    setChatHistory(prev => [...prev, { role: 'assistant', content: reply }]);
                  } catch (err) {
                    console.error(err);
                    alert('Camera upload failed: ' + (err.message || err));
                  }
                }}>Capture & Scan</button>}
            </div>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: '#666' }}>
              Use the mobile camera flow only on phones for best results. On laptops prefer Upload/Drag & Drop.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
