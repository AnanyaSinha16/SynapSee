export default function Home() {
  return (
    <div className="dashboard-container">

      {/* ===== Welcome Section ===== */}
      <div className="welcome-section">
        <h1 className="welcome-title">
          Welcome to <span>SynapSee</span>
        </h1>
        <p className="welcome-subtitle">
          Your intelligent vision companion — where AI meets simplicity.
        </p>
      </div>

      {/* ===== Dashboard Cards ===== */}
      <div className="card-row">
        <div className="glass-card">
          <h2 className="card-title blue">Recent Activity</h2>
          <p className="card-text">
            View your recent OCR scans and AI responses here.
          </p>
        </div>

        <div className="glass-card">
          <h2 className="card-title purple">Quick Start</h2>
          <p className="card-text">
            Capture, extract, and understand — all from your dashboard.
          </p>
        </div>
      </div>

    </div>
  );
}
