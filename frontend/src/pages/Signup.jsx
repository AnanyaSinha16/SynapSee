import { useNavigate } from "react-router-dom";
import "./Login.css"; // reuse same styles

export default function Signup() {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-box">

        <h2 className="login-title">Create Your Account</h2>

        <p className="login-subtitle">Join SynapSee and get started instantly.</p>

        <input type="text" placeholder="Full Name" className="login-input" />
        <input type="email" placeholder="Email address" className="login-input" />
        <input type="password" placeholder="Create password" className="login-input" />

        <button className="login-button">Signup</button>

        <button className="back-button" onClick={() => navigate("/login")}>
          ← Back to Login
        </button>

      </div>
    </div>
  );
}
