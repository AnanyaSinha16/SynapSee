import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      alert("Login successful!");
      localStorage.setItem("synapseeUser", JSON.stringify(res.data.user));
      window.location.href = "/";
    } catch (error) {
      alert("Login failed");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleLogin} className="p-8 bg-white/10 rounded-xl">
        <h2 className="text-xl mb-4 font-semibold">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="p-2 mb-3 w-full text-black"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="p-2 mb-3 w-full text-black"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-purple-600 px-4 py-2 rounded-lg w-full">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
