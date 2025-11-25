import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });

      // Save user in local storage
      localStorage.setItem("synapseeUser", JSON.stringify(res.data.user));

      // Navigate to homepage
      navigate("/");
    } catch (err) {
      alert("Login failed. Please check your email/password.");
      console.error(err);
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Login</h1>

      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>

      <p style={styles.signupText}>
        Don't have an account?{" "}
        <span
          style={styles.link}
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
}

// Inline simple styling
const styles = {
  container: {
    width: "100%",
    maxWidth: "400px",
    margin: "80px auto",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    fontSize: "18px",
    cursor: "pointer",
  },
  signupText: {
    marginTop: "15px",
  },
  link: {
    color: "blue",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default Login;
