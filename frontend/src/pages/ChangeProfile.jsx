import React, { useState } from "react";
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";

const ChangeProfile = () => {
  const user = auth.currentUser;
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center", color: "white" }}>
      <h2>Edit Profile</h2>

      <input
        type="text"
        placeholder="Display Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "8px", margin: "10px", width: "250px" }}
      />

      <input
        type="text"
        placeholder="Photo URL"
        value={photoURL}
        onChange={(e) => setPhotoURL(e.target.value)}
        style={{ padding: "8px", margin: "10px", width: "250px" }}
      />

      <br />
      <button
        onClick={handleSave}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          background: "#4B7BFF",
          color: "white",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Save Changes
      </button>

      {message && <p style={{ marginTop: "15px" }}>{message}</p>}
    </div>
  );
};

export default ChangeProfile;
