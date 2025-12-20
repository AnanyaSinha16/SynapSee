import { useEffect } from "react";
import { initGoogleLogin } from "../googleOneTap";
import { jwtDecode } from "jwt-decode";

export default function Login() {

  useEffect(() => {
    initGoogleLogin(handleGoogleResponse);
  }, []);

  function handleGoogleResponse(response) {
    console.log("Google response:", response);

    const decoded = jwtDecode(response.credential);
    console.log("Decoded user:", decoded);

    localStorage.setItem("user", JSON.stringify(decoded));

    window.location.href = "/";
  }

  return (
    <div style={{ paddingTop: "150px", textAlign: "center" }}>
      <h2>Login</h2>
      <p>Use your Google account to continue</p>
    </div>
  );
}
