import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { motion } from "framer-motion";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/login");
  };

  return (
    <motion.nav
      className="fixed top-4 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-[#0b001b]/70 backdrop-blur-md text-white px-6 py-2 rounded-full shadow-[0_0_20px_#00ffff33] z-50"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Link to="/" className="hover:text-[#00ffff] transition-all duration-300">
        Home
      </Link>
      <Link to="/about" className="hover:text-[#b026ff] transition-all duration-300">
        About
      </Link>

      {!user ? (
        <Link to="/login" className="hover:text-[#00ffff] transition-all duration-300">
          Login
        </Link>
      ) : (
        <div className="relative">
          {/* Profile Avatar */}
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00ffff] to-[#b026ff] flex items-center justify-center cursor-pointer font-semibold text-black"
            title={user.email}
          >
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              user.email.charAt(0).toUpperCase()
            )}
          </div>

          {/* Dropdown Menu */}
          {menuOpen && (
            <motion.div
              className="absolute right-0 mt-2 w-40 bg-[#0b001b]/90 border border-[#00ffff33] rounded-xl shadow-lg backdrop-blur-lg text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="px-4 py-2 border-b border-[#00ffff22] text-gray-300 truncate">
                {user.email}
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-[#b026ff22] transition-all"
              >
                Logout
              </button>
            </motion.div>
          )}
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
