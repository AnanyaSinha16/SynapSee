import React from "react";
import "./Home.css"; // <-- keep your existing css file if any

export default function Home() {
  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #0d001f, #19002e)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >

      {/* ⭐ FLOATING TABS ⭐ */}
      <div className="floating-tabs">
        <a href="/">Home</a>
        <a href="/about">About</a>
      </div>

      {/* ⭐ EXISTING CENTER CARD (unchanged) ⭐ */}
      <div
        style={{
          padding: "35px 60px",
          borderRadius: "18px",
          background: "rgba(255, 255, 255, 0.08)",
          border: "1px solid rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(12px)",
          color: "white",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "10px", fontSize: "28px" }}>
          Hi there 👋
        </h2>
        <p style={{ marginTop: "0", fontSize: "16px", opacity: 0.9 }}>
          Welcome to SynapSee Home.
        </p>
      </div>
    </div>
  );
}
