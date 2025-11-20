import React, { useState, useRef } from "react";

const Navbar = () => {
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageURL = URL.createObjectURL(file);
    setProfileImage(imageURL);
  };

  return (
    <nav className="navbar">
      <div className="profile-container">
        <img
          src={profileImage || "/default-avatar.png"}
          alt="Profile"
          className="profile-image"
          onClick={handleImageClick}
        />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
    </nav>
  );
};

export default Navbar;
