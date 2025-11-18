import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-start pt-24 pb-16 bg-gradient-to-b from-[#0a0015] via-[#120025] to-black text-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {/* TITLE */}
      <motion.h1
        className="text-5xl sm:text-6xl font-extrabold mb-6 mt-6 bg-gradient-to-r from-[#00ffff] to-[#b026ff] bg-clip-text text-transparent text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        About SynapSee
      </motion.h1>

      {/* SUBTEXT */}
      <motion.p
        className="text-lg sm:text-xl text-gray-300 text-center max-w-3xl mb-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        SynapSee is your intelligent visual assistant — combining Optical
        Character Recognition (OCR) and AI-powered understanding into one
        seamless experience. Scan, analyze, and simplify with ease.
      </motion.p>

      {/* CARDS ROW */}
      <div className="flex flex-col sm:flex-row gap-10 mt-4">
        {/* Vision */}
        <div className="p-8 bg-white/10 backdrop-blur-lg border border-[#00ffff33] rounded-2xl w-80 text-center hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_20px_#00ffff55]">
          <h3 className="text-2xl font-bold text-[#00ffff] mb-3">Our Vision</h3>
          <p className="text-gray-300 text-sm">
            Empower people to see and understand the world through AI-driven
            visual intelligence.
          </p>
        </div>

        {/* Mission */}
        <div className="p-8 bg-white/10 backdrop-blur-lg border border-[#b026ff33] rounded-2xl w-80 text-center hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_20px_#b026ffaa]">
          <h3 className="text-2xl font-bold text-[#b026ff] mb-3">Our Mission</h3>
          <p className="text-gray-300 text-sm">
            Blend human creativity and machine intelligence into a single,
            intuitive experience.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
