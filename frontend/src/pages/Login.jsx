import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="h-screen flex justify-center items-center bg-transparent pt-20 px-4">
      <div className="w-full max-w-md glass-card p-8 rounded-2xl text-center">

        <h2 className="text-white text-3xl font-semibold mb-2">
          Login to <span className="text-cyan-300">SynapSee</span>
        </h2>

        <p className="text-gray-300 text-sm mb-8">
          Access your intelligent vision dashboard
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="input-box"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="input-box"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>
        </form>

        <button
          onClick={() => navigate("/")}
          className="mt-6 border border-white/25 text-white px-5 py-2 rounded-xl hover:bg-white/20 transition"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
