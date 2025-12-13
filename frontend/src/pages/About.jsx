import { useNavigate } from "react-router-dom";
import "./About.css";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <div className="about-card">

        <h2 className="about-title">About SynapSee ✨</h2>

        <p className="about-text">
          SynapSee is an intelligent AI-powered vision platform designed to simplify
          accessibility, recognition, and smart interactions for everyone.
        </p>

        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>

      </div>
    </div>
  );
}
