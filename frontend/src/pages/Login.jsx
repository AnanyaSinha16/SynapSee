import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-box">

        <h2 className="login-title">
          Login to <span>SynapSee</span>
        </h2>

        <p className="login-subtitle">
          Access your intelligent vision dashboard
        </p>

        <input type="email" placeholder="Email address" className="login-input" />
        <input type="password" placeholder="Password" className="login-input" />

        <button className="login-button">Login</button>

        <button className="back-button" onClick={() => navigate("/")}>
          ← Back to Home
        </button>

      </div>
    </div>
  );
}
