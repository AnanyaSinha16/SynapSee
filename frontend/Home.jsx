export default function Home() {
  const user = JSON.parse(localStorage.getItem("synapseeUser") || "{}");
  return (
    <div className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <div className="bg-white/10 p-8 rounded-3xl border border-white/20 backdrop-blur-lg">
        <h1 className="text-2xl font-semibold">Hi {user.username || "there"} 👋</h1>
        <p className="text-gray-300 mt-2">Welcome to SynapSee Home.</p>
      </div>
    </div>
  );
}
