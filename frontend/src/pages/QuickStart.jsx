import React from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const Home = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const navigate = useNavigate();
  const auth = getAuth();

  // ✅ Handles navigation for "Recent Activity"
  const handleRecentActivity = () => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/login"); // Redirect to login if not logged in
    } else {
      navigate("/recent-activity"); // Go to history if logged in
    }
  };

  // ✅ Handles "Quick Start" (direct access to OCR dashboard)
  const handleQuickStart = () => {
    navigate("/quickstart");
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0a0015] via-[#120025] to-black text-white relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* 🌌 Background Particles */}
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
            move: { enable: true, speed: 0.7 },
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

      {/* 🧠 Welcome Text */}
      <motion.h1
        className="text-5xl sm:text-6xl font-extrabold mb-4 bg-gradient-to-r from-[#00ffff] to-[#b026ff] bg-clip-text text-transparent text-center relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to SynapSee
      </motion.h1>

      <motion.p
        className="text-lg sm:text-xl text-gray-300 mb-10 text-center max-w-2xl relative z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Your intelligent vision companion — where AI meets simplicity.
      </motion.p>

      {/* 🔹 Feature Cards */}
      <motion.div
        className="flex flex-col sm:flex-row gap-6 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {/* 🟢 Recent Activity */}
        <div
          onClick={handleRecentActivity}
          className="p-8 bg-white/10 backdrop-blur-lg border border-[#00ffff33] rounded-2xl w-80 text-left hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_25px_#00ffff55] cursor-pointer"
        >
          <h3 className="text-xl font-bold text-[#00ffff] hover:text-[#00ffffaa] transition-all duration-300">
            Recent Activity
          </h3>
          <p className="text-gray-300 text-sm mt-2">
            View your recent OCR scans and AI responses here.
          </p>
        </div>

        {/* 🟣 Quick Start */}
        <div
          onClick={handleQuickStart}
          className="p-8 bg-white/10 backdrop-blur-lg border border-[#b026ff33] rounded-2xl w-80 text-left hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_25px_#b026ffaa] cursor-pointer"
        >
          <h3 className="text-xl font-bold text-[#b026ff] hover:text-[#b026ffaa] transition-all duration-300">
            Quick Start
          </h3>
          <p className="text-gray-300 text-sm mt-2">
            Capture, extract, and understand — all from your dashboard.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;