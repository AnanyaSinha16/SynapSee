import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Tesseract from "tesseract.js";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const OcrDashboard = () => {
  const particlesInit = async (main) => await loadFull(main);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [pasteMessage, setPasteMessage] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [usageCount, setUsageCount] = useState(0);

  const inputRef = useRef(null);
  const auth = getAuth();

  // ✅ Load usage count from localStorage on first render
  useEffect(() => {
    const storedCount = parseInt(localStorage.getItem("usageCount") || "0", 10);
    setUsageCount(storedCount);
  }, []);

  // ✅ Reset usage count when user logs in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.removeItem("usageCount");
        setUsageCount(0);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  // ✅ Handle mouse movement (for glow)
  useEffect(() => {
    const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // ✅ Handle paste event
  useEffect(() => {
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

  // ✅ Handle file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  // ✅ Handle drag-drop
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

  // ✅ OCR logic + usage counter update
  const handleScan = async () => {
    const user = auth.currentUser;

    // Guest user limit check
    if (!user && usageCount >= 7) {
      setShowLimitModal(true);
      return;
    }

    if (!image) {
      alert("Please upload an image first!");
      return;
    }

    // Increase count for guest users
    if (!user) {
      const newCount = usageCount + 1;
      setUsageCount(newCount);
      localStorage.setItem("usageCount", newCount.toString());
    }

    setLoading(true);
    setExtractedText("");

    try {
      const result = await Tesseract.recognize(image, "eng", {
        logger: (m) => console.log(m),
      });
      setExtractedText(result.data.text || "⚠️ No readable text found.");
    } catch (error) {
      console.error("OCR Error:", error);
      alert("Failed to extract text. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#120024] via-[#090014] to-black text-white"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      onDragEnter={handleDrag}
    >
      {/* ✨ Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          fpsLimit: 60,
          particles: {
            color: { value: ["#00ffff", "#b026ff"] },
            links: {
              color: "#00ffff",
              distance: 130,
              enable: true,
              opacity: 0.15,
              width: 0.7,
            },
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

      {/* 🌌 Cursor Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,255,255,0.15), transparent 70%)`,
        }}
      />

      {/* 💠 Title */}
      <motion.h1 className="text-4xl sm:text-5xl font-extrabold mb-8 bg-gradient-to-r from-[#00ffff] to-[#b026ff] bg-clip-text text-transparent tracking-wide relative z-10 text-center">
        SynapSee OCR Dashboard
      </motion.h1>

      {/* 📷 Upload Section */}
      <motion.div
        className={`relative z-10 bg-white/10 backdrop-blur-lg border ${
          dragActive ? "border-[#00ffff]" : "border-teal-400/20"
        } shadow-[0_0_25px_#00ffff22] p-6 sm:p-10 rounded-3xl text-center max-w-lg w-[90%] transition-all`}
        whileHover={{ scale: 1.02 }}
        onDrop={handleDrop}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onClick={() => inputRef.current.click()}
      >
        <h3 className="text-xl font-semibold text-[#00ffff] mb-3">
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
          <motion.p
            className="text-green-400 text-sm mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            📋 Image pasted from clipboard!
          </motion.p>
        )}

        <motion.button
          onClick={handleScan}
          disabled={loading}
          className={`w-full py-3 rounded-md ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-[#00ffff] to-[#b026ff]"
          } text-white font-semibold hover:shadow-[0_0_25px_#00ffffaa] transition-all duration-500`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading
            ? "Scanning..."
            : `Start Scanning (${usageCount}/7 free)`}
        </motion.button>

        {image && (
          <motion.div
            className="mt-6 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <img
              src={image}
              alt="Uploaded Preview"
              className="rounded-lg max-h-48 border border-[#00ffff33]"
            />
          </motion.div>
        )}
      </motion.div>

      {/* 🧾 Extracted Text */}
      {extractedText && (
        <motion.div
          className="relative z-10 mt-8 bg-white/10 backdrop-blur-lg border border-purple-400/20 shadow-[0_0_25px_#b026ff22] p-6 rounded-3xl max-w-3xl w-[90%] text-left overflow-auto max-h-96"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3 className="text-lg font-semibold text-[#b026ff] mb-3">
            Extracted Text
          </h3>
          <pre className="text-gray-200 whitespace-pre-wrap text-sm leading-relaxed">
            {extractedText}
          </pre>
        </motion.div>
      )}

      {/* 🚫 Limit Modal */}
      {showLimitModal && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-[#00ffff55] text-center w-[90%] max-w-sm">
            <h2 className="text-2xl font-bold text-[#00ffff] mb-4">
              Limit Reached
            </h2>
            <p className="text-gray-300 mb-6">
              You’ve used your 7 free scans. Please log in or sign up to continue.
            </p>
            <Link
              to="/login"
              className="bg-gradient-to-r from-[#00ffff] to-[#b026ff] text-white py-2 px-4 rounded-lg shadow-md hover:shadow-[0_0_25px_#00ffffaa]"
            >
              Go to Login / Sign Up
            </Link>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default OcrDashboard;
