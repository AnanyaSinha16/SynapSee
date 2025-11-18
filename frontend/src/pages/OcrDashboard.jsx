import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Tesseract from "tesseract.js";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const OcrDashboard = () => {
  const particlesInit = async (main) => await loadFull(main);

  const auth = getAuth();
  const navigate = useNavigate();

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
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
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        setImage(URL.createObjectURL(file));
      } else {
        alert("Please drop an image file.");
      }
    }
  };

  const handleScan = async () => {
    if (!checkFreeLimit()) return;
    if (!image) return alert("Please upload an image first!");

    setLoading(true);
    setExtractedText("");

    try {
      const result = await Tesseract.recognize(image, "eng", {
        logger: (m) => console.log(m),
      });

      setExtractedText(result.data.text || "⚠️ No text found.");
    } catch (error) {
      alert("OCR failed. Please try again!");
      console.error(error);
    } finally {
      setLoading(false);
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
      {/* Background particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          fpsLimit: 60,
          particles: {
            color: { value: ["#00ffff", "#b026ff"] },
            links: { color: "#00ffff", distance: 130, enable: true, opacity: 0.15, width: 0.7 },
            move: { enable: true, speed: 0.6 },
            number: { value: 45 },
            opacity: { value: 0.35 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" }, resize: true },
            modes: { repulse: { distance: 120, duration: 0.4 } },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-[#00ffff] to-[#b026ff] bg-clip-text text-transparent relative z-10">
        SynapSee OCR Dashboard
      </h1>

      {/* FREE SCAN TEXT */}
      {!auth.currentUser && (
        <p className="text-red-400 mb-6 text-lg relative z-10">
          Free scans left: {freeLeft} / 7
        </p>
      )}

      {/* Upload Box */}
      <motion.div
        className={`relative z-10 bg-white/10 backdrop-blur-lg border ${
          dragActive ? "border-[#00ffff]" : "border-teal-400/20"
        } p-6 sm:p-10 rounded-3xl text-center max-w-lg w-[90%] shadow-[0_0_25px_#00ffff22]`}
        whileHover={{ scale: 1.03 }}
        onDrop={handleDrop}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onClick={() => inputRef.current.click()}
      >
        <h3 className="text-xl font-semibold text-[#00ffff] mb-4">
          Upload / Drag-Drop / Paste (Ctrl + V)
        </h3>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        {pasteMessage && (
          <p className="text-green-400 text-sm mb-2">📋 Image pasted!</p>
        )}

        <motion.button
          onClick={handleScan}
          disabled={loading}
          className={`w-full py-3 rounded-md ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-[#00ffff] to-[#b026ff]"
          } text-white font-semibold`}
          whileHover={{ scale: loading ? 1 : 1.05 }}
        >
          {loading ? "Scanning..." : "Start Scanning"}
        </motion.button>

        {image && (
          <motion.div
            className="mt-6 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <img
              src={image}
              alt="Preview"
              className="rounded-lg max-h-48 border border-[#00ffff33]"
            />
          </motion.div>
        )}
      </motion.div>

      {/* Extracted Text */}
      {extractedText && (
        <motion.div
          className="relative z-10 mt-8 bg-white/10 backdrop-blur-lg border border-purple-400/20 p-6 rounded-3xl max-w-3xl w-[90%] text-left max-h-96 overflow-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3 className="text-lg font-semibold text-[#b026ff] mb-2">
            Extracted Text
          </h3>

          <pre className="text-gray-200 whitespace-pre-wrap text-sm">
            {extractedText}
          </pre>
        </motion.div>
      )}
    </motion.div>
  );
};

export default OcrDashboard;
