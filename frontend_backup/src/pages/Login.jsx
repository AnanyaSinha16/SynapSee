import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Login = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({ username: "", password: "" });

  // Initialize particles
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Welcome, ${formData.username}!`);
  };

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Animated Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "transparent" },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: { repulse: { distance: 120, duration: 0.4 } },
          },
          particles: {
            color: { value: "#00FFFF" },
            links: { enable: true, color: "#00FFFF", distance: 120 },
            move: { enable: true, speed: 1 },
            number: { value: 40 },
            opacity: { value: 0.3 },
            size: { value: 2 },
          },
        }}
      />

      {/* Dynamic Glow Following Cursor */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,255,255,0.15), transparent 40%)`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.4 }}
      />

      {/* Neon Glow Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass relative w-[90%] max-w-md p-8 shadow-2xl"
      >
        {/* Glowing Animated Border */}
        <motion.div
          className="absolute inset-0 rounded-3xl border-2 border-cyan-400/30 blur-md"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.03, 1],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        <h2 className="text-3xl font-semibold text-center text-white mb-6 drop-shadow-lg relative z-10">
          Welcome to{" "}
          <span className="text-cyan-400 font-bold animate-pulse">SynapSee</span>
        </h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div>
            <label className="text-white text-sm block mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-white/20 text-white rounded-lg outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-300"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="text-white text-sm block mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-white/20 text-white rounded-lg outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-300"
              placeholder="Enter your password"
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(34,211,238,0.5)" }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold rounded-lg transition-all duration-300"
          >
            Login
          </motion.button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-4">
          Don’t have an account?{" "}
          <a href="#" className="text-cyan-400 hover:underline">
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
