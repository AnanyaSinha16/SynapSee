import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">

      {/* Floating Background Orbs */}
      <div className="orb orb1"></div>
      <div className="orb orb2"></div>
      <div className="orb orb3"></div>

      {/* Main Card */}
      <div className="synapsee-card">
        <h1 className="title-gradient">Welcome to SynapSee</h1>

        <p className="subtitle">
          Your intelligent vision companion — where AI meets simplicity.
        </p>

        <div className="button-group">
          <button className="synapsee-btn" onClick={() => navigate("/about")}>
            About
          </button>
          <button className="synapsee-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </div>

    </div>
  );
}
