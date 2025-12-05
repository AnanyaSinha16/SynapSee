export default function Home() {
  return (
    <div
      style={{
        paddingTop: "120px",
        textAlign: "center",
        height: "100vh",
        width: "100%",
        background: "linear-gradient(135deg, #0a001f, #18002f)",
        position: "relative",
      }}
    >
      {/* 🔹 Floating Navigation Tabs */}
      <div
        style={{
          position: "absolute",
          top: "30px",
          right: "40px",
          display: "flex",
          gap: "20px",
          backdropFilter: "blur(12px)",
          background: "rgba(255, 255, 255, 0.1)",
          padding: "10px 20px",
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <a style={linkStyle} href="/">Home</a>
        <a style={linkStyle} href="/about">About</a>
        <a style={linkStyle} href="/login">Login</a>
      </div>

      {/* Card */}
      <div
        style={{
          margin: "0 auto",
          width: "300px",
          padding: "30px",
          background: "rgba(255, 255, 255, 0.08)",
          borderRadius: "20px",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          color: "white",
        }}
      >
        <h1>Hi there 👋</h1>
        <p>Welcome to SynapSee Home.</p>
      </div>
    </div>
  );
}

const linkStyle = {
  color: "white",
  fontSize: "16px",
  textDecoration: "none",
  fontWeight: "500",
  cursor: "pointer",
  transition: "0.3s",
};

