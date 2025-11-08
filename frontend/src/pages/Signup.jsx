import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        email,
        password,
      });
      toast.success("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-6">Signup</h1>
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
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
