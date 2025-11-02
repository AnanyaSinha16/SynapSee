import React, { useRef, useState } from 'react';

/**
 * Props:
 *  - onResult(text, source) => called when OCR result arrives
 */
export default function UploadOcr({ onResult }) {
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  const handleFile = async (file) => {
    if (!file) return;
    if (file.type.startsWith('image/')) {
      const r = new FileReader();
      r.onload = e => setPreview(e.target.result);
      r.readAsDataURL(file);
    } else {
      setPreview(null);
    }

    const form = new FormData();
    form.append('file', file);

    try {
      setUploading(true);
      setStatus('Uploading & scanning...');
      const res = await fetch('http://localhost:4000/api/ocr-upload', {
        method: 'POST',
        body: form
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Upload failed');
      setStatus('Scan complete');
      onResult && onResult(json.text || '', json.source || '');
    } catch (err) {
      console.error(err);
      setStatus('Error: ' + (err.message || err));
      onResult && onResult('', 'error');
    } finally {
      setUploading(false);
    }
  };

  const onFileChange = (e) => {
    const f = e.target.files?.[0];
    handleFile(f);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    handleFile(f);
  };
  const onDragOver = (e) => e.preventDefault();

  return (
    <div>
      <div
        className="card"
        onDrop={onDrop}
        onDragOver={onDragOver}
        onClick={() => fileRef.current?.click()}
        style={{ textAlign: 'center', border: '2px dashed #e6e6e6', padding: 18, cursor: 'pointer' }}
      >
        <input ref={fileRef} type="file" accept="image/*,.pdf" onChange={onFileChange} style={{ display: 'none' }} />
        <strong>Upload image / Drop here</strong>
        <div style={{ color: '#666', marginTop: 6 }}>PNG / JPG recommended. PDF (text-based) supported.</div>
      </div>

      {preview && (
        <div style={{ marginTop: 12 }}>
          <div style={{ marginBottom: 6 }}>Preview:</div>
          <img src={preview} alt="preview" className="preview-img" />
        </div>
      )}

      <div style={{ marginTop: 10 }}>
        <button onClick={() => fileRef.current?.click()} disabled={uploading}>Choose file</button>
        <span style={{ marginLeft: 12 }}>{status}</span>
      </div>
    </div>
  );
}
