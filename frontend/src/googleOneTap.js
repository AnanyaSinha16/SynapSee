export function initGoogleLogin(onSuccess) {
  if (!window.google) {
    console.error("Google script not loaded");
    return;
  }

  window.google.accounts.id.initialize({
    client_id: "YOUR_GOOGLE_CLIENT_ID",
    callback: onSuccess,
  });

  window.google.accounts.id.prompt(); // 🔥 THIS IS REQUIRED
}
