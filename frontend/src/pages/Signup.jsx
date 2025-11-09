
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Link } from "react-router-dom";

const Signup = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const validate = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    const passwordPattern =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!formData.username.trim()) newErrors.username = "Username is required.";
    else if (formData.username.length < 3)
      newErrors.username = "Username must be at least 3 characters long.";

    if (!formData.email) newErrors.email = "Email is required.";
    else if (!emailPattern.test(formData.email))
      newErrors.email = "Please enter a valid email address.";

    if (!formData.password) newErrors.password = "Password is required.";
    else if (!passwordPattern.test(formData.password))
      newErrors.password =
        "Password must have 8+ chars, 1 uppercase, 1 number, and 1 special character.";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password.";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert(`✅ Welcome, ${formData.username}! You’re successfully registered.`);
      // Later: connect this to backend /api/auth/register
    }
  };

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
            number: { value: window.innerWidth < 640 ? 25 : 60 },
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

      {/* 💠 Glass Signup Card */}
      <motion.div
        className="relative z-10 bg-white/10 backdrop-blur-lg border border-purple-400/30 shadow-[0_0_25px_#b026ff55] rounded-2xl p-6 sm:p-10 w-full max-w-xs sm:max-w-md text-center transition-all duration-500"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -60 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        whileHover={{
          boxShadow: "0 0 35px #b026ff88",
          scale: 1.02,
        }}
      >
        {/* ✨ Title */}
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#b026ff] to-[#00ffff] mb-6 sm:mb-8 tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Sign Up
        </motion.h2>

        {/* 💫 Form */}
        <form
          className="flex flex-col space-y-4 sm:space-y-5"
          onSubmit={handleSubmit}
        >
          {/* Username */}
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="p-3 sm:p-4 rounded-md bg-[#0f0f1a]/60 text-white border border-[#b026ff44] focus:ring-2 focus:ring-[#b026ffaa] outline-none transition-all duration-300 text-sm sm:text-base placeholder-gray-400 w-full"
            />
            {errors.username && (
              <p className="text-red-400 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="p-3 sm:p-4 rounded-md bg-[#0f0f1a]/60 text-white border border-[#b026ff44] focus:ring-2 focus:ring-[#b026ffaa] outline-none transition-all duration-300 text-sm sm:text-base placeholder-gray-400 w-full"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="p-3 sm:p-4 rounded-md bg-[#0f0f1a]/60 text-white border border-[#b026ff44] focus:ring-2 focus:ring-[#b026ffaa] outline-none transition-all duration-300 text-sm sm:text-base placeholder-gray-400 w-full"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="p-3 sm:p-4 rounded-md bg-[#0f0f1a]/60 text-white border border-[#b026ff44] focus:ring-2 focus:ring-[#b026ffaa] outline-none transition-all duration-300 text-sm sm:text-base placeholder-gray-400 w-full"
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="py-2 sm:py-3 rounded-md bg-gradient-to-r from-[#b026ff] to-[#00ffff] text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-[0_0_25px_#b026ffaa] transition-all duration-500 disabled:opacity-40 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={
              !formData.username ||
              !formData.email ||
              !formData.password ||
              !formData.confirmPassword
            }
          >
            Sign Up
          </motion.button>
        </form>

        {/* 💬 Login link */}
        <p className="text-gray-300 text-xs sm:text-sm text-center mt-5 sm:mt-6">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-[#b026ff] hover:underline hover:text-[#00ffff] transition-colors duration-300"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
