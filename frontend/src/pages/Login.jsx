import { useEffect } from "react";

export default function Login() {

  useEffect(() => {
    if (!window.google) {
      console.error("Google not loaded");
      return;
    }

    window.google.accounts.id.initialize({
      client_id: "YOUR_GOOGLE_CLIENT_ID",
      callback: (response) => {
        console.log("✅ GOOGLE RESPONSE:", response);

        localStorage.setItem("google_token", response.credential);

        alert("Login success ✅");
        window.location.href = "/";
      },
    });

    window.google.accounts.id.renderButton(
      document.getElementById("googleBtn"),
      { theme: "outline", size: "large" }
    );

  }, []);

  return (
    <div style={{ paddingTop: "150px", textAlign: "center" }}>
      <h2>Login</h2>
      <div id="googleBtn"></div>
    </div>
  );
}
