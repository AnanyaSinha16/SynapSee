// src/components/ProfileMenu.jsx
import React, { useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const ProfileMenu = ({ user }) => {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    signOut(auth);
    localStorage.removeItem("userLoggedIn");
    window.location.href = "/login";
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Profile Button */}
      <img
        src={user.photoURL || "https://www.svgrepo.com/show/530446/user-circle.svg"}
        alt="Profile"
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          cursor: "pointer",
          border: "2px solid white",
        }}
        onClick={() => setOpen(!open)}
      />

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "50px",
            right: 0,
            background: "#1a1a2e",
            color: "white",
            padding: "15px",
            borderRadius: "10px",
            width: "200px",
            boxShadow: "0 0 20px rgba(255,255,255,0.2)",
            zIndex: 100,
          }}
        >
          <p style={{ fontSize: "14px", marginBottom: "10px", opacity: 0.8 }}>
            {user.email}
          </p>

          <button
            style={{
              width: "100%",
              padding: "8px",
              background: "#16213e",
              color: "white",
              border: "none",
              borderRadius: "6px",
              marginBottom: "10px",
              cursor: "pointer",
            }}
            onClick={() => alert("Profile settings coming soon!")}
          >
            Edit Profile
          </button>

          <button
            style={{
              width: "100%",
              padding: "8px",
              background: "#e94560",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
