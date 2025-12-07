import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2>Login 🔐</h2>

        <input type="text" placeholder="Username" style={input} />
        <input type="password" placeholder="Password" style={input} />

        <button style={btn}>Login</button>

        <p onClick={() => navigate("/")} style={backText}>
          ⬅ Back to Home
        </p>
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
  width: "300px",
};

const input = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "8px",
  border: "none",
};

const btn = {
  width: "100%",
  padding: "10px",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer",
  marginTop: "10px",
};

const backText = {
  marginTop: "15px",
  cursor: "pointer",
  opacity: 0.7,
};
