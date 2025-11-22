import api from "../api/api";
import { useState } from "react";

const Profile = () => {
  const [image, setImage] = useState(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    setImage(file);

    const formData = new FormData();
    formData.append("profile", file);

    const res = await api.post("/user/upload-profile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Profile Updated!");
  };

  return (
    <div>
      <h1>Profile</h1>
      <input type="file" onChange={handleUpload} />
    </div>
  );
};

export default Profile;
