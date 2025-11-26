export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0b001a] to-[#000] text-white flex flex-col justify-center items-center px-6 py-20">
      
      {/* Heading */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-[#76a7ff] drop-shadow-lg">
          Welcome to SynapSee
        </h1>
        <p className="text-gray-300 mt-4 text-lg max-w-2xl">
          Your intelligent vision companion — where AI meets simplicity.
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
        
        {/* Recent Activity */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl hover:bg-white/10 transition">
          <h2 className="text-2xl font-semibold text-[#5bb0ff]">Recent Activity</h2>
          <p className="text-gray-300 mt-3">
            View your recent OCR scans and AI responses here.
          </p>
        </div>

        {/* Quick Start */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl hover:bg-white/10 transition">
          <h2 className="text-2xl font-semibold text-purple-400">Quick Start</h2>
          <p className="text-gray-300 mt-3">
            Capture, extract, and understand — all from your dashboard.
          </p>
        </div>

      </div>
    </div>
  );
}
