import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!");
      navigate("/home");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800 text-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800 text-white"
          required
        />
        <button
          type="submit"
          className="bg-pink-600 hover:bg-pink-700 py-2 rounded text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
