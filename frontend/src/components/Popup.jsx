import React from "react";
import "./Popup.css";

const Popup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2>Login Required</h2>
        <p>You have used all 7 free attempts. Please log in to continue.</p>
        <button className="popup-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
