import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert("Login API will integrate here!");
  };

  return (
    <div style={container}>
      <div style={card}>
        <h1 style={title}>Login to SynapSee</h1>
        <p style={subtitle}>Access your intelligent vision dashboard</p>

        <form onSubmit={handleLogin} style={form}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={input}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={input}
            required
          />

          <button type="submit" style={loginBtn}>Login</button>
        </form>

        <button onClick={() => navigate("/")} style={backBtn}>
          ⬅ Back to Home
        </button>
      </div>
    </div>
  );
}

const container = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "radial-gradient(circle at top, #2a004f, #050010)",
};

const card = {
  width: "380px",
  padding: "35px",
  background: "rgba(255, 255, 255, 0.08)",
  borderRadius: "20px",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  backdropFilter: "blur(12px)",
  color: "white",
  textAlign: "center",
};

const title = {
  fontSize: "28px",
  marginBottom: "10px",
  background: "linear-gradient(90deg, #4f46e5, #06b6d4)",
  WebkitBackgroundClip: "text",
  color: "transparent",
};

const subtitle = {
  fontSize: "14px",
  opacity: 0.8,
  marginBottom: "20px",
};

const form = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const input = {
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  outline: "none",
  color: "#fff",
  background: "rgba(255, 255, 255, 0.12)",
};

const loginBtn = {
  marginTop: "10px",
  padding: "12px 20px",
  borderRadius: "12px",
  border: "none",
  cursor: "pointer",
  background: "linear-gradient(90deg, #9333ea, #14b8a6)",
  color: "white",
  fontSize: "16px",
  boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)",
  transition: "0.2s",
};

const backBtn = {
  marginTop: "20px",
  padding: "10px 20px",
  borderRadius: "10px",
  border: "1px solid white",
  background: "transparent",
  color: "white",
  cursor: "pointer",
};
