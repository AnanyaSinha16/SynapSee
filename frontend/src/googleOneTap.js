export const initializeGoogleOneTap = (onSuccess) => {
  /* global google */
  if (!window.google) return;

  window.google.accounts.id.initialize({
    client_id: "YOUR_GOOGLE_CLIENT_ID",
    callback: onSuccess,
    auto_select: true,
    cancel_on_tap_outside: false,
  });

  window.google.accounts.id.prompt(); // Show One Tap popup
};
