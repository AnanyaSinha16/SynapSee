import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  const isActive = (path) => location.pathname === path;

  // Pill button base style
  const pillStyle = `
    px-6 py-2 rounded-full text-sm font-medium
    transition-all duration-300
    border border-white/10 backdrop-blur-lg
    hover:shadow-[0_0_12px_#00fff5] hover:text-cyan-300
  `;

  return (
    <nav className="fixed top-4 w-full flex justify-center z-50">
      <div className="flex items-center gap-4">
        
        {/* HOME BUTTON */}
        <Link
          to="/home"
          className={`
            ${pillStyle}
            ${isActive("/home")
              ? "text-cyan-300 shadow-[0_0_12px_#00fff5]"
              : "text-white bg-[#0d1021]/60"
            }
          `}
        >
          Home
        </Link>

        {/* ABOUT BUTTON */}
        <Link
          to="/about"
          className={`
            ${pillStyle}
            ${isActive("/about")
              ? "text-cyan-300 shadow-[0_0_12px_#00fff5]"
              : "text-white bg-[#0d1021]/60"
            }
          `}
        >
          About
        </Link>

        {/* PROFILE / LOGIN */}
        {!user ? (
          <Link
            to="/login"
            className={`
              ${pillStyle}
              ${isActive("/login")
                ? "text-cyan-300 shadow-[0_0_12px_#00fff5]"
                : "text-white bg-[#0d1021]/60"
              }
            `}
          >
            Login
          </Link>
        ) : (
          <div className="relative">
            <div
              onClick={() => setShowProfile(!showProfile)}
              className="
                w-10 h-10 flex items-center justify-center 
                rounded-full bg-green-500 cursor-pointer 
                text-white text-sm font-bold shadow-[0_0_10px_#00ff72]
                hover:shadow-[0_0_15px_#00ff72] transition-all
              "
            >
              {user.displayName ? user.displayName.charAt(0).toUpperCase() : "A"}
            </div>

            {/* Profile Dropdown */}
            {showProfile && (
              <div className="
                absolute right-0 mt-3 w-48 p-4 
                bg-[#0b0f1e]/90 backdrop-blur-xl
                border border-white/10 rounded-xl shadow-xl
              ">
                <p className="text-white font-semibold">
                  {user.displayName || "No Name"}
                </p>
                <p className="text-gray-400 text-xs mb-3">{user.email}</p>

                <button className="text-blue-400 text-sm hover:underline mb-2">
                  Change Profile Photo
                </button>

                <button
                  onClick={() => signOut(auth)}
                  className="text-red-400 text-sm hover:underline"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
