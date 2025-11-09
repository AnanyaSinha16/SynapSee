import React from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const About = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <motion.div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#120024] via-[#090014] to-black text-white px-4 sm:px-0"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      {/* 🌌 Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 z-0"
        options={{
          fullScreen: { enable: false },
          fpsLimit: 60,
          particles: {
            color: { value: ['#00ffff', '#b026ff'] },
            links: {
              color: '#00ffff',
              distance: 130,
              enable: true,
              opacity: 0.15,
              width: 0.7,
            },
            move: { enable: true, speed: 0.5 },
            number: { value: 45 },
            opacity: { value: 0.35 },
            shape: { type: 'circle' },
            size: { value: { min: 1, max: 3 } },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: 'repulse' }, resize: true },
            modes: { repulse: { distance: 120, duration: 0.4 } },
          },
          detectRetina: true,
        }}
      />

      {/* 🪩 Title */}
      <motion.h1
        className="text-3xl sm:text-5xl font-extrabold mb-6 sm:mb-8 bg-gradient-to-r from-[#00ffff] to-[#b026ff] bg-clip-text text-transparent tracking-wide relative z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        About SynapSee
      </motion.h1>

      {/* 💬 Description */}
      <motion.p
        className="text-gray-300 text-sm sm:text-lg max-w-md sm:max-w-2xl text-center leading-relaxed sm:leading-loose relative z-10"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        SynapSee is your intelligent visual assistant — combining Optical Character Recognition (OCR)
        and AI-powered understanding into one seamless experience. Scan, analyze, and simplify with ease.
      </motion.p>

      {/* 💠 Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mt-10 sm:mt-16 px-4 sm:px-6 z-10 w-full max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
      >
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white/10 backdrop-blur-lg border border-teal-400/20 p-5 sm:p-6 rounded-2xl shadow-[0_0_25px_#00ffff22] text-center sm:text-left"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-[#00ffff] mb-2">
            Our Vision
          </h3>
          <p className="text-gray-300 text-xs sm:text-sm">
            Empower people to see and understand the world through AI-driven visual intelligence.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white/10 backdrop-blur-lg border border-purple-500/20 p-5 sm:p-6 rounded-2xl shadow-[0_0_25px_#b026ff22] text-center sm:text-left"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-[#b026ff] mb-2">
            Our Mission
          </h3>
          <p className="text-gray-300 text-xs sm:text-sm">
            Blend human creativity and machine intelligence into a single, intuitive experience.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default About;
