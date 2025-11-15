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
  const hasNum = /\d/.test(password);
  const hasLetter = /[A-Za-z]/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasBothCases = /[a-z]/.test(password) && /[A-Z]/.test(password);

  const allValid =
    hasLength && hasNum && hasLetter && hasSymbol && hasBothCases;

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!allValid) {
      setError("Password does not meet the required criteria.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card glow-box">
        <h1>Create Account</h1>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSignup}>
          <label>Email</label>
          <input
            type="email"
            className="input-box"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            className="input-box"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <ul className="rules">
            <li className={hasLength ? "valid" : "invalid"}>
              • At least 8 characters
            </li>
            <li className={hasNum ? "valid" : "invalid"}>• Contains a number</li>
            <li className={hasLetter ? "valid" : "invalid"}>
              • Contains a letter
            </li>
            <li className={hasSymbol ? "valid" : "invalid"}>
              • Contains a symbol
            </li>
            <li className={hasBothCases ? "valid" : "invalid"}>
              • Uppercase & lowercase letters
            </li>
          </ul>

          <label>Confirm Password</label>
          <input
            type="password"
            className="input-box"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button className="signup-btn" disabled={!allValid}>
            Sign Up
          </button>
        </form>

        <button className="google-signup-btn" onClick={handleGoogleSignup}>
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="google-icon"
            alt="Google"
          />
          Continue with Google
        </button>

        <p className="bottom-text">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
