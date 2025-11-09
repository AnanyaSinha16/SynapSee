import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Link } from "react-router-dom";

const Login = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#1a0033] via-[#0a0020] to-black text-white px-4 sm:px-0">
      {/* ✨ Floating teal-purple particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          fpsLimit: 120,
          particles: {
            color: { value: ["#00ffff", "#b026ff"] },
            links: {
              color: "#00ffff",
              distance: 120,
              enable: true,
              opacity: 0.2,
              width: 0.6,
            },
            move: { enable: true, speed: 0.6 },
            number: { value: window.innerWidth < 640 ? 25 : 60 }, // ⚙️ fewer particles on mobile
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" }, resize: true },
            modes: { repulse: { distance: 100, duration: 0.4 } },
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
        transition={{ type: "tween", ease: "backOut", duration: 0.4 }}
      />

      {/* 💠 Glass Login Card */}
      <motion.div
        className="relative z-10 bg-white/10 backdrop-blur-lg border border-teal-400/30 shadow-[0_0_25px_#00ffff55] rounded-2xl p-6 sm:p-10 w-full max-w-xs sm:max-w-md text-center transition-all duration-500"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -60 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        whileHover={{
          boxShadow: "0 0 35px #00ffff88",
          scale: 1.02,
        }}
      >
        {/* ✨ Title */}
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] to-[#b026ff] mb-6 sm:mb-8 tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Login
        </motion.h2>

        {/* 💫 Form */}
        <form
          className="flex flex-col space-y-4 sm:space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Login functionality will connect to backend soon!");
          }}
        >
          <input
            type="email"
            placeholder="Email"
            className="p-3 sm:p-4 rounded-md bg-[#0f0f1a]/60 text-white border border-[#00ffff44] focus:ring-2 focus:ring-[#00ffffaa] outline-none transition-all duration-300 text-sm sm:text-base placeholder-gray-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 sm:p-4 rounded-md bg-[#0f0f1a]/60 text-white border border-[#00ffff44] focus:ring-2 focus:ring-[#00ffffaa] outline-none transition-all duration-300 text-sm sm:text-base placeholder-gray-400"
          />
          <motion.button
            type="submit"
            className="py-2 sm:py-3 rounded-md bg-gradient-to-r from-[#00ffff] to-[#b026ff] text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-[0_0_25px_#00ffffaa] transition-all duration-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </form>

        {/* 💬 Sign up link */}
        <p className="text-gray-300 text-xs sm:text-sm text-center mt-5 sm:mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-[#00ffff] hover:underline hover:text-[#b026ff] transition-colors duration-300"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
