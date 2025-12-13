import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">

      <h1 className="home-title">Welcome to SynapSee</h1>

      <p className="home-subtitle">
        Your intelligent vision companion — where AI meets simplicity.
      </p>

      <div className="home-cards">
        <div className="home-card">
          <h3 className="card-title cyan">Recent Activity</h3>
          <p className="card-text">View your recent OCR scans and AI responses here.</p>
        </div>

        <div className="home-card">
          <h3 className="card-title magenta">Quick Start</h3>
          <p className="card-text">Capture, extract, and understand — all from your dashboard.</p>
        </div>
      </div>
    </div>
  );
}
