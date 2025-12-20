import { useEffect } from "react";
import { initGoogleLogin } from "../googleOneTap";

export default function Login() {

  useEffect(() => {
    initGoogleLogin(handleGoogleResponse);
  }, []);

  function handleGoogleResponse(response) {
    console.log("FULL GOOGLE RESPONSE:", response);

    // ✅ Save raw token (for testing)
    localStorage.setItem("token", response.credential);

    alert("Google login success ✅");
    window.location.href = "/";
  }

  return (
    <div style={{ paddingTop: "150px", textAlign: "center" }}>
      <h2>Login</h2>
      <p>Use your Google account</p>
    </div>
  );
}
