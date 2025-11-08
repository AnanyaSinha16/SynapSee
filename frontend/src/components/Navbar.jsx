import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const location = useLocation();

  const links = [
    { path: "/", label: "Login", tagline: "Access SynapSee" },
    { path: "/about", label: "About", tagline: "Know SynapSee" },
    { path: "/home", label: "Home", tagline: "Your Smart Space" },
  ];

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-5 left-1/2 -translate-x-1/2 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-8 py-3 z-50 shadow-[0_0_25px_#00ffff33]"
    >
      {links.map((link) => (
        <motion.div key={link.path} className="relative mx-5 text-center">
          <Link
            to={link.path}
            className={`block transition-all duration-300 ${
              location.pathname === link.path
                ? "text-[#00ffff] font-semibold"
                : "text-gray-300 hover:text-[#00ffff]"
            }`}
          >
            {link.label}
          </Link>

          {/* Tagline under link (fades in only when active) */}
          {location.pathname === link.path && (
            <motion.span
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xs text-[#00ffffaa] block mt-1 tracking-wider"
            >
              {link.tagline}
            </motion.span>
          )}

          {/* Glowing underline animation */}
          {location.pathname === link.path && (
            <motion.div
              layoutId="activeLink"
              className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00ffff] to-[#b026ff] rounded-full"
            />
          )}
        </motion.div>
      ))}
    </motion.nav>
  );
};

export default Navbar;
