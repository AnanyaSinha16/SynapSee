import React from "react";
import "./Popup.css";

const Popup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2>Limit Reached ⚠️</h2>
        <p>You have used all 7 free attempts. Please log in to continue.</p>

        <div className="popup-buttons">
          <button
            className="popup-login-btn"
            onClick={() => (window.location.href = "/login")}
          >
            Log In
          </button>

          <button className="popup-cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
