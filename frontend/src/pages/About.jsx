import React from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <div style={container}>
      <div style={card}>
        <h1 style={title}>About SynapSee ✨</h1>

        <p style={text}>
          SynapSee is an intelligent AI-powered vision platform designed to make
          image understanding, OCR, and smart interactions simple and accessible.
        </p>

        <p style={text}>
          It helps users extract text, understand visual data, and interact with
          information in a seamless, intuitive way.
        </p>

        <button style={btn} onClick={() => navigate("/home")}>
          ⬅ Back to Home
        </button>
      </div>
    </div>
  );
}

/* ---------- Styles ---------- */

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#000",
  padding: "20px",
};

const card = {
  maxWidth: "520px",
  padding: "32px",
  borderRadius: "18px",
  background: "rgba(255, 255, 255, 0.08)",
  backdropFilter: "blur(14px)",
  color: "#fff",
  textAlign: "center",
  boxShadow: "0 0 30px rgba(0, 234, 255, 0.15)",
};

const title = {
  fontSize: "28px",
  marginBottom: "16px",
  color: "#00eaff",
};

const text = {
  fontSize: "15px",
  lineHeight: "1.6",
  marginBottom: "12px",
  color: "#dffcff",
};

const btn = {
  marginTop: "20px",
  padding: "10px 22px",
  borderRadius: "10px",
  border: "none",
  background: "#00eaff",
  color: "#000",
  fontWeight: "600",
  cursor: "pointer",
};
