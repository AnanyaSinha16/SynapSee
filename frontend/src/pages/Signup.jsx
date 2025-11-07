import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Signup = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const validate = () => {
    const e = {};
    if (!formData.username.trim()) e.username = "Username is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) e.email = "Enter a valid email";
    if (formData.password.length < 6) e.password = "Min 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (ev) => {
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    // Mock register: save to localStorage for now
    localStorage.setItem("synapseeUser", JSON.stringify({
      username: formData.username,
      email: formData.email
    }));
    alert(`Welcome to SynapSee, ${formData.username}!`);
    // Optional: redirect after signup
    window.location.href = "/home";
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      {/* Cursor-reactive glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(168,85,247,0.25), transparent 40%)`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.4 }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 w-[90%] max-w-md shadow-2xl hover:shadow-purple-500/30 transition-all duration-500"
      >
        <h2 className="text-3xl font-semibold text-center mb-6 drop-shadow-lg">
          Create your <span className="text-purple-400 font-bold">SynapSee</span> account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm block mb-1">Username</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/20 text-white rounded-lg outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-300"
              placeholder="Enter your username"
            />
            {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username}</p>}
          </div>

          <div>
            <label className="text-sm block mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/20 text-white rounded-lg outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-300"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="text-sm block mb-1">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/20 text-white rounded-lg outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-300"
              placeholder="Create a password"
            />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 25px rgba(168,85,247,0.6)" }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-2 bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded-lg transition-all duration-300"
          >
            Sign Up
          </motion.button>
        </form>

        <p className="text-gray-300 text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-purple-400 hover:underline">
            Log in
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
