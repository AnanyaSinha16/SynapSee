export default function Home() {
  return (
    <div className="dashboard-container">
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
