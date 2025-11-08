import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
    }
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-800 via-black to-fuchsia-900 text-white">
      <h1 className="text-4xl font-bold mb-4">SynapSee Dashboard</h1>
      <p className="text-lg text-gray-300">
        Welcome back, {user?.username}! Your assistant is ready.
      </p>
    </div>
  );
}
