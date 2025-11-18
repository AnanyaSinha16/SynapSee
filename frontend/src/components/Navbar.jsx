import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return unsub;
  }, []);

  const handleLogout = () => {
    signOut(auth);
    setOpenMenu(false);
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        
        {/* Glowing Tabs */}
        <li>
          <Link className="nav-tab" to="/">Home</Link>
        </li>

        <li>
          <Link className="nav-tab" to="/about">About</Link>
        </li>

        {!user && (
          <li>
            <Link className="nav-tab" to="/login">Login</Link>
          </li>
        )}

        {/* PROFILE when logged in */}
        {user && (
          <li className="profile-wrapper">
            <img
              src={user.photoURL || "/defaultProfile.png"}
              className="profile-icon"
              onClick={() => setOpenMenu(!openMenu)}
              alt="profile"
            />

            {openMenu && (
              <div className="profile-menu">
                <p className="email">{user.email}</p>

                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
