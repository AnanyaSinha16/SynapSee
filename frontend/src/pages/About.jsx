import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
    >
      <h1 className="text-5xl font-bold text-cyan-400 mb-4">About SynapSee</h1>
      <p className="max-w-2xl text-center text-gray-300 mb-8 px-4 leading-relaxed">
        SynapSee is your intelligent assistant — merging vision and AI.
        Capture, scan, and understand information through your camera.
        Experience real-time OCR + AI chat like never before.
      </p>
      <Link
        to="/home"
        className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-white rounded-lg font-semibold transition-all"
      >
        Continue to Home
      </Link>
    </motion.div>
  );
};

// 👇 This line is the missing piece
export default About;
