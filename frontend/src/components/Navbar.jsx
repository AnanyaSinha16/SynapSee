import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import "./Navbar.css";   // <-- IMPORTANT

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
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>

        {!user && <li><Link to="/login">Login</Link></li>}

        {user && (
          <li className="profile-wrapper">
            <img
              src={user.photoURL || "/defaultProfile.png"}
              className="profile-icon"
              onClick={() => setOpenMenu(!openMenu)}
            />

            {openMenu && (
              <div className="profile-menu">
                <p className="email">{user.email}</p>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
