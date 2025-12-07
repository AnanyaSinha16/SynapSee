import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2>About SynapSee ✨</h2>
        <p>
          SynapSee is an intelligent AI-powered vision platform designed to
          simplify accessibility, recognition, and smart interactions for
          everyone.
        </p>

        <button onClick={() => navigate("/")} style={btn}>
          ⬅ Back to Home
        </button>
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
  width: "400px",
};

const btn = {
  padding: "10px 22px",
  borderRadius: "12px",
  border: "none",
  cursor: "pointer",
  marginTop: "20px",
};
