import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Home = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <motion.div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#120024] via-[#090014] to-black text-white"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* 🌌 Cursor Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        animate={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,255,255,0.15), transparent 70%)`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.4 }}
      />

      {/* ✨ Floating Teal–Purple Glow */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(0,255,255,0.1), transparent 60%)",
            "radial-gradient(circle at 80% 70%, rgba(176,38,255,0.1), transparent 60%)",
          ],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* 🪩 Welcome Text */}
      <motion.h1
        className="text-5xl font-extrabold mb-8 bg-gradient-to-r from-[#00ffff] to-[#b026ff] bg-clip-text text-transparent tracking-wide"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        Welcome to SynapSee
      </motion.h1>

      {/* 💬 Subtitle */}
      <motion.p
        className="text-gray-300 text-lg mb-12 max-w-lg text-center leading-relaxed"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        Your intelligent vision companion — where AI meets simplicity.
      </motion.p>

      {/* 💠 Animated Glass Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-6 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/10 backdrop-blur-lg border border-teal-400/20 p-6 rounded-2xl shadow-[0_0_25px_#00ffff22] transition-all duration-500"
        >
          <h3 className="text-xl font-semibold text-[#00ffff] mb-2">Recent Activity</h3>
          <p className="text-gray-300 text-sm">View your recent OCR scans and AI responses here.</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/10 backdrop-blur-lg border border-purple-500/20 p-6 rounded-2xl shadow-[0_0_25px_#b026ff22] transition-all duration-500"
        >
          <h3 className="text-xl font-semibold text-[#b026ff] mb-2">Quick Start</h3>
          <p className="text-gray-300 text-sm">Capture, extract, and understand — all from your dashboard.</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
