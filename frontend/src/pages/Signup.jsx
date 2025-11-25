import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function handleSignup(e) {
    e.preventDefault();

    try {
      const res = await api.post("/auth/signup", {
        name,
        email,
        password,
      });

      // Save user info
      localStorage.setItem("synapseeUser", JSON.stringify(res.data.user));

      navigate("/");
    } catch (err) {
      alert("Signup failed");
      console.error(err);
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Create Account</h1>

      <form onSubmit={handleSignup} style={styles.form}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />

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

        <button type="submit" style={styles.button}>Sign Up</button>
      </form>

      <p style={styles.loginText}>
        Already have an account?{" "}
        <span
          style={styles.link}
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </div>
  );
}

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
  loginText: {
    marginTop: "15px",
  },
  link: {
    color: "blue",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default Signup;
