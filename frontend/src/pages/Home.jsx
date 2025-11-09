import React from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Home = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <motion.div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#120024] via-[#090014] to-black text-white"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* 🌌 Floating teal–purple particles (same style as Login) */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 z-0"
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
            move: { enable: true, speed: 0.5 },
            number: { value: 55 },
            opacity: { value: 0.35 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" }, resize: true },
            modes: { repulse: { distance: 130, duration: 0.4 } },
          },
          detectRetina: true,
        }}
      />

      {/* ✨ Floating background glow movement */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(0,255,255,0.12), transparent 60%)",
            "radial-gradient(circle at 80% 70%, rgba(176,38,255,0.12), transparent 60%)",
          ],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* 🪩 Welcome Heading */}
      <motion.h1
        className="text-5xl font-extrabold mb-8 bg-gradient-to-r from-[#00ffff] to-[#b026ff] bg-clip-text text-transparent tracking-wide relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        Welcome to SynapSee
      </motion.h1>

      {/* 💬 Subtitle */}
      <motion.p
        className="text-gray-300 text-lg mb-12 max-w-lg text-center leading-relaxed relative z-10"
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
        {/* Card 1 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/10 backdrop-blur-lg border border-teal-400/20 p-6 rounded-2xl shadow-[0_0_25px_#00ffff22] transition-all duration-500"
        >
          <h3 className="text-xl font-semibold text-[#00ffff] mb-2">
            Recent Activity
          </h3>
          <p className="text-gray-300 text-sm">
            View your recent OCR scans and AI responses here.
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/10 backdrop-blur-lg border border-purple-500/20 p-6 rounded-2xl shadow-[0_0_25px_#b026ff22] transition-all duration-500"
        >
          <h3 className="text-xl font-semibold text-[#b026ff] mb-2">
            Quick Start
          </h3>
          <p className="text-gray-300 text-sm">
            Capture, extract, and understand — all from your dashboard.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
