import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* your background + card code */}

      <div className="button-group">
        <button className="synapsee-btn" onClick={() => navigate("/about")}>
          About
        </button>
        <button className="synapsee-btn">Login</button>
      </div>
    </div>
  );
}
