import { useEffect } from "react";
import { initializeGoogleOneTap } from "../googleOneTap";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    initializeGoogleOneTap((response) => {
      console.log("Google One Tap Response:", response);

      // Normally you verify token on backend, but here:
      navigate("/");
    });
  }, []);

  return (
    <div className="login-container">
      {/* your login UI remains exactly the same */}
    </div>
  );
}
