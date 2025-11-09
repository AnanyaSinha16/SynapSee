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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#120024] via-[#090014] to-black text-white"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* 🌌 Floating teal–purple particles */}
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

      {/* ✨ Floating glow animation */}
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

      {/* 🪩 Heading */}
      <motion.h1
        className="text-5xl font-extrabold mb-8 bg-gradient-to-r from-[#00ffff] to-[#b026ff] bg-clip-text text-transparent tracking-wide relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        About SynapSee
      </motion.h1>

      {/* 💬 Description */}
      <motion.p
        className="text-gray-300 text-lg max-w-2xl text-center leading-loose relative z-10 px-6"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        SynapSee is your intelligent visual assistant — combining Optical Character Recognition (OCR)
        and AI-powered text understanding into one seamless experience. Whether you’re scanning notes,
        reading documents, or translating content, SynapSee makes it effortless with precision and beauty.
      </motion.p>

      {/* 💠 Animated Info Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-16 px-6 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
      >
        {/* Card 1 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/10 backdrop-blur-lg border border-teal-400/20 p-6 rounded-2xl shadow-[0_0_25px_#00ffff22] transition-all duration-500"
        >
          <h3 className="text-xl font-semibold text-[#00ffff] mb-2">Our Vision</h3>
          <p className="text-gray-300 text-sm">
            Empower people to see and understand the world through AI-driven visual intelligence.
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/10 backdrop-blur-lg border border-purple-500/20 p-6 rounded-2xl shadow-[0_0_25px_#b026ff22] transition-all duration-500"
        >
          <h3 className="text-xl font-semibold text-[#b026ff] mb-2">Our Mission</h3>
          <p className="text-gray-300 text-sm">
            To create technology that blends human creativity and machine intelligence into an intuitive experience.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default About;
