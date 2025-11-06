import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Login = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({ username: "", password: "" });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Welcome, ${formData.username}!`);
  };

  // Track mouse movement for the background glow
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* 🌌 Animated Particle Background */}
      <Particles
        className="absolute inset-0 z-0"
        init={async (engine) => {
          await loadFull(engine);
        }}
        options={{
          background: { color: "transparent" },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: {
              repulse: { distance: 100, duration: 0.4 },
            },
          },
          particles: {
            color: { value: "#22d3ee" },
            links: {
              color: "#22d3ee",
              distance: 120,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: "bounce",
              random: false,
              speed: 1.2,
              straight: false,
            },
            number: {
              density: { enable: true, area: 800 },
              value: 60,
            },
            opacity: { value: 0.4 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 4 } },
          },
          detectRetina: true,
        }}
      />

      {/* 💡 Glowing Cursor Light */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10"
        animate={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(34,211,238,0.2), transparent 40%)`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.4 }}
      />

      {/* 🪩 Glass Login Card with Neon Glow */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-20 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 w-[90%] max-w-md shadow-[0_0_25px_rgba(34,211,238,0.2)] hover:shadow-[0_0_45px_rgba(34,211,238,0.6)] transition-all duration-500"
      >
        {/* Pulsing Glow Ring */}
        <motion.div
          className="absolute -inset-1 rounded-3xl blur-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-60 animate-pulse"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Actual Card Content */}
        <div className="relative z-10">
          <h2 className="text-3xl font-semibold text-center text-white mb-6 drop-shadow-lg">
            Welcome to <span className="text-cyan-400 font-bold">SynapSee</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
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
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 25px rgba(34,211,238,0.7)" }}
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
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
