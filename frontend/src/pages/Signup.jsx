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

  const isLongEnough = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasUpperLower = /(?=.*[a-z])(?=.*[A-Z])/.test(password);

  const allValid =
    isLongEnough && hasNumber && hasLetter && hasSymbol && hasUpperLower;

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!allValid) {
      setError("Password does not meet security requirements.");
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

  return (
    <div className="signup-container">

      <div className="signup-box">

        <h1 className="gradient-title">Create Account</h1>

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

          {/* Password Rules */}
          <div className="rules-box">

            <p className={isLongEnough ? "valid" : "invalid"}>
              • At least 8 characters
            </p>
            <p className={hasNumber ? "valid" : "invalid"}>
              • Contains a number
            </p>
            <p className={hasLetter ? "valid" : "invalid"}>
              • Contains a letter
            </p>
            <p className={hasSymbol ? "valid" : "invalid"}>
              • Contains a symbol
            </p>
            <p className={hasUpperLower ? "valid" : "invalid"}>
              • Uppercase and lowercase letters
            </p>

          </div>

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

        <p className="login-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;
