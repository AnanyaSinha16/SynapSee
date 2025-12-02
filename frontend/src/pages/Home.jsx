export default function Home() {
  return (
    <div style={{ paddingTop: "120px", textAlign: "center" }}>

      {/* Gradient Title */}
      <h1 className="title-gradient">Welcome to SynapSee</h1>

      {/* Subtitle */}
      <p className="subtitle">
        Your intelligent vision companion — where AI meets simplicity.
      </p>

      {/* Cards */}
      <div className="card-row">

        <div className="glass-card">
          <h2 style={{ color: "#00eaff", marginBottom: "8px" }}>
            Recent Activity
          </h2>
          <p>View your recent OCR scans and AI responses here.</p>
        </div>

        <div className="glass-card">
          <h2 style={{ color: "#d94cff", marginBottom: "8px" }}>
            Quick Start
          </h2>
          <p>Capture, extract, and understand — all from your dashboard.</p>
        </div>

      </div>
    </div>
  );
}
