import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <div className="about-card">

        <h1 className="about-title">
          About <span>SynapSee</span> ✨
        </h1>

        <p className="about-text">
          SynapSee is an intelligent AI-powered vision platform designed to
          simplify accessibility, recognition, and smart interactions for
          everyone.
        </p>

        <p className="about-text secondary">
          By combining computer vision, OCR, and contextual AI understanding,
          SynapSee transforms how users interact with visual information —
          making technology more human, intuitive, and inclusive.
        </p>

        <button className="about-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>

      </div>
    </div>
  );
}
