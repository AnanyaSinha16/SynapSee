import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
// remove client-side Tesseract import (we'll call backend)
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import API from "../api/api"; // <-- axios instance

const OcrDashboard = () => {
  const particlesInit = async (main) => await loadFull(main);
  const auth = getAuth();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [pasteMessage, setPasteMessage] = useState(false);
  const [freeLeft, setFreeLeft] = useState(7);
  const inputRef = useRef(null);

  const checkFreeLimit = () => {
    const user = auth.currentUser;
    if (user) return true;

    let count = localStorage.getItem("free_scans");
    if (!count) count = 0;

    if (count >= 7) {
      alert("⚠️ You used all 7 free scans. Please login to continue.");
      navigate("/login");
      return false;
    }
    const updatedCount = Number(count) + 1;
    localStorage.setItem("free_scans", updatedCount);
    setFreeLeft(7 - updatedCount);
    return true;
  };

  useEffect(() => {
    if (!auth.currentUser) {
      const count = Number(localStorage.getItem("free_scans")) || 0;
      setFreeLeft(7 - count);
    }

    // paste handler
    const handlePaste = (e) => {
      if (e.clipboardData && e.clipboardData.items) {
        for (let i = 0; i < e.clipboardData.items.length; i++) {
          const item = e.clipboardData.items[i];
          if (item.type.indexOf("image") !== -1) {
            const blob = item.getAsFile();
            const imgURL = URL.createObjectURL(blob);
            setImage(imgURL);
            setPasteMessage(true);
            setTimeout(() => setPasteMessage(false), 3000);
          }
        }
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const handleDrag = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        setImage(URL.createObjectURL(file));
        // Also attach file to inputRef's files? easier: store the file in state:
        // We'll store as File object in state by reading it below:
        // But for simplicity below we'll fetch the blob from the data URL or use a hidden file input.
      } else {
        alert("Please drop an image file.");
      }
    }
  };

  // We keep a ref for the last selected File
  const lastFileRef = useRef(null);
  const onFileChangeSave = (e) => {
    const f = e.target.files[0];
    if (f) {
      lastFileRef.current = f;
      setImage(URL.createObjectURL(f));
    }
  };

  // update input to use onFileChangeSave (see JSX below)

  const handleScan = async () => {
    if (!checkFreeLimit()) return;
    setExtractedText("");
    setLoading(true);

    try {
      // If we have an actual File in lastFileRef use it, otherwise try to fetch the dataURL image
      let fileToUpload = lastFileRef.current;

      if (!fileToUpload && image) {
        // convert dataURL (image) to blob
        const resp = await fetch(image);
        fileToUpload = await resp.blob();
        // give a filename
        fileToUpload = new File([fileToUpload], "pasted-image.png", { type: "image/png" });
      }

      if (!fileToUpload) {
        setLoading(false);
        return alert("Please upload or paste an image first!");
      }

      const formData = new FormData();
      formData.append("image", fileToUpload);

      const res = await API.post("/ocr", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setExtractedText(res.data.text || "⚠️ No text found.");
    } catch (err) {
      console.error("Scan error:", err);
      alert("OCR failed. See console.");
    } finally {
      setLoading(false);
      // clear lastFileRef if you want
      lastFileRef.current = null;
    }
  };

  return (
    <motion.div
      className="relative min-h-screen flex flex-col items-center justify-start pt-32 overflow-hidden bg-gradient-to-b from-[#120024] via-[#090014] to-black text-white"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      onDragEnter={handleDrag}
    >
      <Particles id="tsparticles" init={particlesInit} className="absolute inset-0 z-0"
        options={{
          fullScreen: { enable: false },
          fpsLimit: 60,
          particles: {
            color: { value: ["#00ffff", "#b026ff"] },
            links: { color: "#00ffff", distance: 130, enable: true, opacity: 0.15, width: 0.7 },
            move: { enable: true, speed: 0.6 },
            number: { value: 45 }, opacity: { value: 0.35 },
            shape: { type: "circle" }, size: { value: { min: 1, max: 3 } }
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" }, resize: true },
            modes: { repulse: { distance: 120, duration: 0.4 } }
          },
          detectRetina: true
        }}
      />

      <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-[#00ffff] to-[#b026ff] bg-clip-text text-transparent relative z-10">
        SynapSee OCR Dashboard
      </h1>

      {!auth.currentUser && (
        <p className="text-red-400 mb-6 text-lg relative z-10">Free scans left: {freeLeft} / 7</p>
      )}

      <motion.div
        className={`relative z-10 bg-white/10 backdrop-blur-lg border ${dragActive ? "border-[#00ffff]" : "border-teal-400/20"} p-6 sm:p-10 rounded-3xl text-center max-w-lg w-[90%] shadow-[0_0_25px_#00ffff22]`}
        whileHover={{ scale: 1.03 }}
        onDrop={handleDrop} onDragOver={handleDrag} onDragLeave={handleDrag}
        onClick={() => inputRef.current?.click()}
      >
        <h3 className="text-xl font-semibold text-[#00ffff] mb-4">Upload / Drag-Drop / Paste (Ctrl + V)</h3>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={(e) => { onFileChangeSave(e); }}
          className="hidden"
        />

        {pasteMessage && <p className="text-green-400 text-sm mb-2">📋 Image pasted!</p>}

        <motion.button
          onClick={handleScan}
          disabled={loading}
          className={`w-full py-3 rounded-md ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-gradient-to-r from-[#00ffff] to-[#b026ff]"} text-white font-semibold`}
          whileHover={{ scale: loading ? 1 : 1.05 }}
        >
          {loading ? "Scanning..." : "Start Scanning"}
        </motion.button>

        {image && (
          <motion.div className="mt-6 flex justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <img src={image} alt="Preview" className="rounded-lg max-h-48 border border-[#00ffff33]" />
          </motion.div>
        )}
      </motion.div>

      {extractedText && (
        <motion.div className="relative z-10 mt-8 bg-white/10 backdrop-blur-lg border border-purple-400/20 p-6 rounded-3xl max-w-3xl w-[90%] text-left max-h-96 overflow-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3 className="text-lg font-semibold text-[#b026ff] mb-2">Extracted Text</h3>
          <pre className="text-gray-200 whitespace-pre-wrap text-sm">{extractedText}</pre>
        </motion.div>
      )}
    </motion.div>
  );
};

export default OcrDashboard;

