import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <div style={container}>
      <div style={content}>
        {/* LEFT SECTION */}
        <div style={left}>
          <h1 style={title}>About SynapSee ✨</h1>

          <p style={para}>
            SynapSee is an intelligent AI-powered vision platform designed to
            simplify accessibility.
          </p>

          <p style={para}>
            By combining computer vision, OCR, and contextual AI understanding,
            SynapSee aims to make technology more human, intuitive, and
            inclusive.
          </p>

          <button style={btn} onClick={() => navigate("/")}>
            ← Back to Home
          </button>
        </div>

        {/* RIGHT SECTION */}
        <div style={right}>
          <div style={glassCard}>
            <h3 style={cardTitle}>✨ What SynapSee Offers</h3>
            <ul style={list}>
              <li>AI-powered image & text understanding</li>
              <li>OCR-based real-world data extraction</li>
              <li>Accessible, human-first design</li>
              <li>Smart contextual insights</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
