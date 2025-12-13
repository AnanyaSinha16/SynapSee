import { useNavigate } from "react-router-dom";
import "./FloatingNav.css";

export default function FloatingNav() {
  const navigate = useNavigate();

  return (
    <div className="float-nav">
      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate("/about")}>About</button>
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
}
