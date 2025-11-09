import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const OcrDashboard = () => {
  const particlesInit = async (main) => await loadFull(main);
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
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* 🌌 Glow and Particles */}
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

      {/* 💠 Title */}
      <motion.h1
        className="text-4xl sm:text-5xl font-extrabold mb-8 bg-gradient-to-r from-[#00ffff] to-[#b026ff] bg-clip-text text-transparent tracking-wide relative z-10 text-center"
      >
        SynapSee OCR Dashboard
      </motion.h1>

      {/* 📷 Upload Section */}
      <motion.div
        className="relative z-10 bg-white/10 backdrop-blur-lg border border-teal-400/20 shadow-[0_0_25px_#00ffff22] p-6 sm:p-10 rounded-3xl text-center max-w-lg w-[90%]"
        whileHover={{ scale: 1.02 }}
      >
        <h3 className="text-xl font-semibold text-[#00ffff] mb-3">Upload Image for OCR</h3>
        <input
          type="file"
          accept="image/*"
          className="w-full text-sm bg-[#0f0f1a]/60 text-gray-200 p-3 rounded-lg border border-[#00ffff44] mb-4"
        />
        <motion.button
          className="w-full py-3 rounded-md bg-gradient-to-r from-[#00ffff] to-[#b026ff] text-white font-semibold hover:shadow-[0_0_25px_#00ffffaa] transition-all duration-500"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Scanning
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default OcrDashboard;
