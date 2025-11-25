import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function Home() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine); // FIXES engine.checkVersion error
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0A0014, #120025)",
        padding: "60px 40px",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          particles: {
            number: { value: 60 },
            size: { value: 2 },
            move: { enable: true, speed: 0.4 },
            links: {
              enable: true,
              color: "#ffffff55",
              distance: 120,
            },
            color: { value: ["#06b6d4", "#a855f7"] },
          },
        }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      />

      {/* CONTENT */}
      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Header */}
        <h1
          style={{
            fontSize: "64px",
            fontWeight: "700",
            marginBottom: "10px",
            letterSpacing: "1px",
            background: "linear-gradient(90deg, #06b6d4, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Welcome to SynapSee
        </h1>

        <p
          style={{
            fontSize: "20px",
            color: "#d1d5db",
            marginTop: "5px",
            marginBottom: "50px",
          }}
        >
          Your intelligent vision companion — where AI meets simplicity.
        </p>

        {/* Cards Container */}
        <div
          style={{
            display: "flex",
            gap: "40px",
            marginTop: "30px",
            flexWrap: "wrap",
          }}
        >
          {/* Card 1 */}
          <div
            style={{
              flex: "1",
              minWidth: "320px",
              padding: "30px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "16px",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <h2
              style={{
                marginBottom: "10px",
                fontSize: "26px",
                color: "#06b6d4",
              }}
            >
              Recent Activity
            </h2>
            <p style={{ color: "#e2e8f0", fontSize: "16px" }}>
              View your recent OCR scans and AI responses here.
            </p>
          </div>

          {/* Card 2 */}
          <div
            style={{
              flex: "1",
              minWidth: "320px",
              padding: "30px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "16px",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <h2
              style={{
                marginBottom: "10px",
                fontSize: "26px",
                color: "#a855f7",
              }}
            >
              Quick Start
            </h2>
            <p style={{ color: "#e2e8f0", fontSize: "16px" }}>
              Capture, extract, and understand — all from your dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
