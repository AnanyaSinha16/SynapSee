import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // simple static check for now (we’ll connect to backend later)
    if (email === "test@gmail.com" && password === "12345") {
      localStorage.setItem("token", "demo-token");
      onLogin({ name: "Demo User", email });
    } else {
      setError("Invalid credentials. Try test@gmail.com / 12345");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-xl shadow-lg w-[400px]"
      >
        <h1 className="text-3xl font-semibold text-center mb-6 text-emerald-400">
          SynapSee Login
        </h1>

        {error && <p className="text-red-400 mb-3 text-center">{error}</p>}

        <label className="block mb-2 text-sm font-medium text-gray-300">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter email"
          className="w-full p-3 mb-4 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-emerald-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block mb-2 text-sm font-medium text-gray-300">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter password"
          className="w-full p-3 mb-6 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-emerald-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-500 p-3 rounded-lg font-semibold"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-400 mt-4">
          Don’t have an account?{" "}
          <span className="text-emerald-400 cursor-pointer hover:underline">
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}
