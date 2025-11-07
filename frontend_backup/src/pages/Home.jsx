import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
    >
      <h1 className="text-4xl font-bold text-cyan-400 mb-3">
        Welcome to SynapSee
      </h1>
      <p className="text-gray-300 mb-8">
        Your intelligent visual assistant is ready to help.
      </p>
      <div className="space-x-4">
        <Link
          to="/about"
          className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 rounded-lg"
        >
          About
        </Link>
        <Link
          to="/"
          className="px-5 py-2 bg-white/20 hover:bg-white/30 rounded-lg"
        >
          Logout
        </Link>
      </div>
    </motion.div>
  );
};

export default Home;
