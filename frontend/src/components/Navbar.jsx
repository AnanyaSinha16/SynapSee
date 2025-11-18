import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
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

  // -------------------- CHANGE PROFILE PIC --------------------
  const handleProfileChange = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async () => {
        await updateProfile(auth.currentUser, {
          photoURL: reader.result,
        });
        setUser({ ...auth.currentUser });
      };

      reader.readAsDataURL(file);
    };

    fileInput.click();
  };
  // ------------------------------------------------------------

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link className="glow-tab" to="/">Home</Link>
        </li>

        <li>
          <Link className="glow-tab" to="/about">About</Link>
        </li>

        {!user && (
          <li>
            <Link className="glow-tab" to="/login">Login</Link>
          </li>
        )}

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

                <button className="change-btn" onClick={handleProfileChange}>
                  Change Profile
                </button>

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
