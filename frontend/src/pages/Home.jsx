import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2>Hi there 👋</h2>
        <p>Welcome to SynapSee Home.</p>

        <div style={btnGroup}>
          <button onClick={() => navigate("/about")} style={btn}>
            About
          </button>
          <button onClick={() => navigate("/login")} style={btn}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

const containerStyle = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "radial-gradient(circle at top, #2a004f, #050010)",
};

const cardStyle = {
  padding: "30px 40px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.3)",
  backdropFilter: "blur(10px)",
  color: "white",
  textAlign: "center",
};

const btnGroup = {
  display: "flex",
  gap: "15px",
  justifyContent: "center",
  marginTop: "20px",
};

const btn = {
  padding: "10px 22px",
  borderRadius: "12px",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
};
