import React, { useState } from "react";
import API from "../api/api";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert(`Welcome back, ${res.data.user.username}!`);
      window.location.href = "/home";
    } catch (err) {
      alert(`❌ ${err.response?.data?.message || "Invalid credentials"}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-800 via-black to-fuchsia-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-64 gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="p-2 rounded text-black"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="p-2 rounded text-black"
        />
        <button
          type="submit"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 transition p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
