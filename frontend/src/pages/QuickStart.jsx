import React, { useEffect, useState } from "react";
import Popup from "../components/Popup";

const QuickStart = () => {
  const [attempts, setAttempts] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const MAX_ATTEMPTS = 7;

  useEffect(() => {
    const storedAttempts = Number(localStorage.getItem("quick_attempts")) || 0;
    setAttempts(storedAttempts);

    const isLoggedIn = localStorage.getItem("userLoggedIn");

    // ⭐ FIX FOR OPTION B:
    // If user logged in (from signup OR login) reset attempts
    if (isLoggedIn === "true") {
      localStorage.removeItem("quick_attempts");
      setAttempts(0);
    }
  }, []);

  const handleQuickStart = () => {
    const isLoggedIn = localStorage.getItem("userLoggedIn");

    // ⭐ MAIN FIX: If flag true → unlimited usage
    if (isLoggedIn === "true") {
      console.log("Logged-in → unlimited access.");
      return;
    }

    // Not logged in → 7 free attempts
    if (attempts < MAX_ATTEMPTS) {
      const newCount = attempts + 1;
      localStorage.setItem("quick_attempts", newCount);
      setAttempts(newCount);
      console.log("Free attempt used:", newCount);
      return;
    }

    // After 7 → popup
    setShowPopup(true);
  };

  return (
    <>
      {showPopup && <Popup onClose={() => setShowPopup(false)} />}

      <div
        onClick={handleQuickStart}
        style={{
          padding: "25px",
          borderRadius: "15px",
          background: "rgba(255,255,255,0.1)",
          boxShadow: "0 0 20px rgba(180,0,255,0.5)",
          cursor: "pointer",
          width: "320px",
          margin: "20px auto",
          color: "white"
        }}
      >
        <h3 style={{ fontSize: "24px", color: "#d46bff" }}>Quick Start</h3>
        <p style={{ fontSize: "16px", color: "#bbbbe0" }}>
          Capture, extract, and understand — all from your dashboard.
        </p>
      </div>
    </>
  );
};

export default QuickStart;
