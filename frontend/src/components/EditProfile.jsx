import React, { useState } from "react";
import { auth, storage } from "../firebase";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const EditProfile = ({ onClose }) => {
  const user = auth.currentUser;

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSave = async () => {
    if (!image) return alert("Please select an image!");

    try {
      setUploading(true);

      const storageRef = ref(storage, `profile/${user.uid}.jpg`);
      await uploadBytes(storageRef, image);

      const url = await getDownloadURL(storageRef);

      await updateProfile(user, { photoURL: url });

      alert("Profile updated!");
      onClose();
      window.location.reload();

    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="profile-modal">
      <div className="profile-box">
        <h3>Update Profile Photo</h3>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button className="save-btn" onClick={handleSave} disabled={uploading}>
          {uploading ? "Uploading..." : "Save"}
        </button>
        <button className="close-btn" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditProfile;
