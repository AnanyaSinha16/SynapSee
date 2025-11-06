import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const location = useLocation();

  const links = [
    { path: "/", label: "Login" },
    { path: "/about", label: "About" },
    { path: "/home", label: "Home" },
  ];

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 flex gap-6 text-sm text-white z-50 shadow-lg"
    >
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`relative transition-all duration-300 ${
            location.pathname === link.path
              ? "text-cyan-400 font-semibold"
              : "text-gray-300 hover:text-cyan-300"
          }`}
        >
          {link.label}
          {location.pathname === link.path && (
            <motion.div
              layoutId="activeLink"
              className="absolute -bottom-1 left-0 right-0 h-[2px] bg-cyan-400 rounded-full"
            />
          )}
        </Link>
      ))}
    </motion.nav>
  );
};

export default Navbar;
