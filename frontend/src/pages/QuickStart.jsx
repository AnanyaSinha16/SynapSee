import React, { useEffect, useState } from "react";
import Popup from "../components/Popup";

const QuickStart = () => {
  const [attempts, setAttempts] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const MAX_ATTEMPTS = 7;

  useEffect(() => {
    const stored = Number(localStorage.getItem("quick_attempts")) || 0;
    setAttempts(stored);
  }, []);

  const handleQuickStart = () => {
    const isLoggedIn = localStorage.getItem("userLoggedIn");

    if (isLoggedIn === "true") {
      return;
    }

    if (attempts < MAX_ATTEMPTS) {
      const next = attempts + 1;
      setAttempts(next);
      localStorage.setItem("quick_attempts", next);
      return;
    }

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
          boxShadow: "0 0 25px rgba(180,0,255,0.5)",
          cursor: "pointer",
          width: "330px",
          margin: "20px auto",
          color: "white"
        }}
      >
        <h3 style={{ fontSize: "24px", color: "#d46bff" }}>Quick Start</h3>
        <p style={{ fontSize: "16px", color: "#bbbbe0" }}>
          Capture, extract, and understand — all from your dashboard.
        </p>

        {/* COUNTER */}
        <p style={{ 
          marginTop: "10px", 
          fontSize: "15px", 
          fontWeight: "bold", 
          color: "#a1ffa1"
        }}>
          Free uses left: {MAX_ATTEMPTS - attempts} / {MAX_ATTEMPTS}
        </p>
      </div>
    </>
  );
};

export default QuickStart;
