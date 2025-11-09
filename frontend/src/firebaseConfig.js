// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnjrrsbNOO5qgEopVORe0YAAqtQIsUkxc",
  authDomain: "synapsee-login.firebaseapp.com",
  projectId: "synapsee-login",
  storageBucket: "synapsee-login.appspot.com", // ✅ fixed domain
  messagingSenderId: "282353835071",
  appId: "1:282353835071:web:7b7128d3a8d75d5fe7ec8a",
  measurementId: "G-H1K84Q0H7M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Auth setup
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
