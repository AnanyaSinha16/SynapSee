import React, { useState } from "react";
import "./Signup.css";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const hasLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasUpperLower = /(?=.*[a-z])(?=.*[A-Z])/.test(password);

  const allValid =
    hasLength && hasNumber && hasLetter && hasSymbol && hasUpperLower;

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!allValid) {
      setError("Password does not meet all requirements.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      // ✅ IMPORTANT: Mark user as logged in
      localStorage.setItem("userLoggedIn", "true");

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());

      // ✅ Google login → mark logged in
      localStorage.setItem("userLoggedIn", "true");

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-page">
      <form className="signup-card" onSubmit={handleSignup}>
        <h2 className="title">Create Account</h2>

        {error && <p className="error">{error}</p>}

        <label>Email</label>
        <input
          className="input-field"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          className="input-field"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <ul className="rules">
          <li className={hasLength ? "valid" : "invalid"}>At least 8 characters</li>
          <li className={hasNumber ? "valid" : "invalid"}>Contains a number</li>
          <li className={hasLetter ? "valid" : "invalid"}>Contains a letter</li>
          <li className={hasSymbol ? "valid" : "invalid"}>Contains a symbol</li>
          <li className={hasUpperLower ? "valid" : "invalid"}>
            Uppercase & lowercase letters
          </li>
        </ul>

        <label>Confirm Password</label>
        <input
          className="input-field"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="signup-btn" disabled={!allValid}>
          Sign Up
        </button>

        <button type="button" className="google-btn" onClick={handleGoogleSignup}>
          <img src="/google.png" alt="Google" className="google-icon" />
          Continue with Google
        </button>

        <p className="login-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
