import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

// NEON BUTTON
function NeonButton({ children, ...props }) {
  return (
    <button
      {...props}
      className="neon-btn px-4 py-2 rounded-md text-white font-medium"
    >
      {children}
    </button>
  );
}

// NEON CARD
function NeonCard({ children, className = "" }) {
  return (
    <div className={`neon-card ${className}`}>
      {children}
    </div>
  );
}

// AUTH UI (LOGIN + REGISTER)
function Auth({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      const url = API + "/auth/" + (mode === "login" ? "login" : "register");
      const body =
        mode === "login"
          ? { email, password }
          : { name, email, password };

      const res = await axios.post(url, body);
      const { user, token } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      onAuth(user, token);
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <NeonCard className="max-w-md w-full">
        <h2 className="text-3xl font-semibold mb-4 text-white drop-shadow-lg">
          {mode === "login" ? "Login" : "Create Account"}
        </h2>

        <form onSubmit={submit} className="space-y-3">
          {mode === "register" && (
            <input
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-white/10 text-white border border-purple-300/20"
            />
          )}

          <input
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-white/10 text-white border border-purple-300/20"
          />

          <input
            placeholder="Password"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-white/10 text-white border border-purple-300/20"
          />

          <div className="flex items-center justify-between pt-2">
            <NeonButton type="submit">
              {mode === "login" ? "Login" : "Register"}
            </NeonButton>

            <button
              type="button"
              className="text-purple-200 hover:text-white text-sm"
              onClick={() => setMode(mode === "login" ? "register" : "login")}
            >
              {mode === "login" ? "Create account" : "Back to login"}
            </button>
          </div>
        </form>
      </NeonCard>
    </div>
  );
}

// OCR CHATS
function MessageCard({ item }) {
  return (
    <NeonCard>
      <img
        src={API + "/uploads/" + item.filename}
        className="w-32 h-24 object-cover rounded-md mb-2"
      />
      <pre className="text-sm whitespace-pre-wrap text-purple-200">
        {item.text}
      </pre>
      <small className="text-purple-300 block mt-2">
        {new Date(item.createdAt).toLocaleString()}
      </small>
    </NeonCard>
  );
}

// MAIN APP
export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "null"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  function onAuth(u, t) {
    setUser(u);
    setToken(t);
  }

  async function loadResults() {
    if (!token) return;
    try {
      const res = await axios.get(API + "/results", {
        headers: { Authorization: "Bearer " + token },
      });
      setResults(res.data);
    } catch {}
  }

  async function upload(e) {
    e.preventDefault();
    if (!file) return;

    const fd = new FormData();
    fd.append("image", file);

    await axios.post(API + "/ocr", fd, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    });

    if (inputRef.current) inputRef.current.value = "";
    setFile(null);
    loadResults();
  }

  useEffect(() => {
    loadResults();
  }, [token]);

  if (!user || !token) return <Auth onAuth={onAuth} />;

  return (
    <div className="min-h-screen p-6 text-white">
      <div className="max-w-5xl mx-auto space-y-6">

        <NeonCard>
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <h1 className="text-2xl font-bold">Welcome, {user.name || user.email}</h1>

            <NeonButton
              onClick={() => {
                localStorage.clear();
                setUser(null);
                setToken(null);
              }}
            >
              Logout
            </NeonButton>
          </div>
        </NeonCard>

        <NeonCard>
          <form onSubmit={upload} className="flex gap-3 items-center">
            <input
              ref={inputRef}
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="text-purple-200"
            />
            <NeonButton type="submit">Upload & OCR</NeonButton>
          </form>
        </NeonCard>

        <div className="grid gap-4 md:grid-cols-2">
          {results.map((item) => (
            <MessageCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
