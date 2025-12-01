// frontend/src/App.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import clsx from "clsx";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

function IconMoon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

function IconSun({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            d="M12 3v2m0 14v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2m18 0h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
      <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
    </svg>
  );
}

function Auth({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      const url = API + "/auth/" + (mode === "login" ? "login" : "register");
      const body = mode === "login" ? { email, password } : { name, email, password };
      const res = await axios.post(url, body);
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      onAuth(user, token);
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-card/80 dark:bg-card/90 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4"> {mode === "login" ? "Login" : "Register"} </h2>
        <form onSubmit={submit} className="space-y-3">
          {mode === "register" && (
            <input required placeholder="Name" value={name}
                   onChange={e => setName(e.target.value)}
                   className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-800 bg-transparent" />
          )}
          <input required placeholder="Email" value={email}
                 onChange={e => setEmail(e.target.value)}
                 className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-800 bg-transparent" />
          <input required placeholder="Password" type="password" value={password}
                 onChange={e => setPassword(e.target.value)}
                 className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-800 bg-transparent" />
          <div className="flex items-center justify-between">
            <button type="submit" className="px-4 py-2 rounded-md bg-accent text-white">Submit</button>
            <button type="button" className="text-sm text-muted" onClick={() => setMode(mode === "login" ? "register" : "login")}>
              {mode === "login" ? "Create account" : "Have an account?"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function MessageCard({ item }) {
  return (
    <div className="flex gap-4 p-4 bg-white/60 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-gray-800">
      <div className="w-36 flex-shrink-0">
        <img src={API + "/uploads/" + item.filename} alt="upload"
             className="w-full h-24 object-cover rounded-md border border-gray-200 dark:border-gray-800" />
      </div>
      <div className="flex-1">
        <div className="text-xs text-muted mb-1">{new Date(item.createdAt).toLocaleString()}</div>
        <pre className="whitespace-pre-wrap text-sm leading-relaxed">{item.text}</pre>
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "null"));
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [dark, setDark] = useState(document.documentElement.classList.contains("dark"));
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    if (!token) return;
    fetchResults();
    // eslint-disable-next-line
  }, [token]);

  async function fetchResults() {
    try {
      const res = await axios.get(API + "/results", { headers: { Authorization: "Bearer " + token }});
      setResults(res.data || []);
    } catch (err) {
      console.error(err);
    }
  }

  function onAuth(u, t) {
    setUser(u);
    setToken(t);
    localStorage.setItem("user", JSON.stringify(u));
    localStorage.setItem("token", t);
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setResults([]);
  }

  async function upload(e) {
    e.preventDefault();
    if (!file) return alert("Choose a file");
    const fd = new FormData();
    fd.append("image", file);
    try {
      await axios.post(API + "/ocr", fd, {
        headers: { Authorization: "Bearer " + token, "Content-Type": "multipart/form-data" },
        timeout: 120000
      });
      setFile(null);
      if (inputRef.current) inputRef.current.value = "";
      fetchResults();
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  }

  if (!user || !token) return <Auth onAuth={onAuth} />;

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-b from-gray-50 to-transparent dark:from-[#071126]">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Camera OCR</h1>
            <div className="text-sm text-muted">{user.name || user.email}</div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setDark(d => !d)}
                    className="p-2 rounded-md border border-gray-200 dark:border-gray-800">
              {dark ? <IconSun className="w-5 h-5" /> : <IconMoon className="w-5 h-5" />}
            </button>
            <button onClick={logout} className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-800">
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="p-4 bg-card/80 dark:bg-card/90 rounded-xl border border-gray-200 dark:border-gray-800">
              <form onSubmit={upload} className="flex gap-3 items-center">
                <input ref={inputRef} type="file" accept="image/*"
                       onChange={e => setFile(e.target.files[0])}
                       className="block w-full text-sm text-muted file:border-0 file:bg-transparent" />
                <button type="submit" className="px-4 py-2 rounded-md bg-accent text-white">Upload & OCR</button>
              </form>
              <div className="text-xs text-muted mt-2">Tip: use a clear photo of printed text for best results.</div>
            </div>

            <div className="space-y-3">
              {results.length === 0 && (
                <div className="p-6 text-center text-muted bg-white/60 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-gray-800">
                  No OCR results yet.
                </div>
              )}

              {results.map(item => (
                <MessageCard key={item._id} item={item} />
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="p-4 bg-card/80 dark:bg-card/90 rounded-xl border border-gray-200 dark:border-gray-800">
              <h3 className="font-medium mb-2">Account</h3>
              <div className="text-sm text-muted">Email: {user.email}</div>
              <div className="text-sm text-muted">User ID: {user._id || "—"}</div>
            </div>

            <div className="p-4 bg-card/80 dark:bg-card/90 rounded-xl border border-gray-200 dark:border-gray-800">
              <h3 className="font-medium mb-2">Quick Actions</h3>
              <button onClick={fetchResults} className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-800 mb-2">
                Refresh
              </button>
              <button onClick={() => alert('You can extend to share or export results')} className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-800">
                Export
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
