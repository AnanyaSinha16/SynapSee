import "./Footer.css";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-brand">SynapSee ✨</p>

        <div className="footer-links">
          <span onClick={() => navigate("/")}>Home</span>
          <span onClick={() => navigate("/about")}>About</span>
          <span onClick={() => navigate("/login")}>Login</span>
          <span onClick={() => navigate("/signup")}>Signup</span>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} SynapSee. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
