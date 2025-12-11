export default function Home() {
  return <h1>Home Page</h1>
(
    <div className="home-container">

      {/* Floating Background Orbs */}
      <div className="orb orb1"></div>
      <div className="orb orb2"></div>
      <div className="orb orb3"></div>

      {/* Glass AI Card */}
      <div className="synapsee-card">
        <h1 className="title-gradient">Welcome to SynapSee</h1>

        <p className="subtitle">
          Your intelligent vision companion — where AI meets simplicity.
        </p>

        <div className="button-group">
          <button className="synapsee-btn">About</button>
          <button className="synapsee-btn">Login</button>
        </div>
      </div>

    </div>
  );
}
