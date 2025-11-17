// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnjrrsbNOO5qgEopVORe0YAAqtQIsUkxc",
  authDomain: "synapsee-login.firebaseapp.com",
  projectId: "synapsee-login",
  storageBucket: "synapsee-login.firebasestorage.app",
  messagingSenderId: "282353835071",
  appId: "1:282353835071:web:7b7128d3a8d75d5fe7ec8a",
  measurementId: "G-H1K84Q0H7M"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// 🔥 Export listener for Navbar
export const listenToAuth = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export default app;
