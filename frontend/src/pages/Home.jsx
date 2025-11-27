import { useCallback } from "react";
import { loadSlim } from "tsparticles-slim";
import Particles from "react-tsparticles";

export default function Home() {
  // Initialize particles
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-gray-950 text-white overflow-hidden">
      {/* Background Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: true },
          background: { color: "#0a0a0a" },
          particles: {
            number: { value: 70 },
            size: { value: 2 },
            move: { enable: true, speed: 0.6 },
            links: { enable: true, color: "#ffffff20", distance: 130 },
          },
        }}
        className="absolute inset-0 -z-10"
      />

      {/* Page Content */}
      <div className="max-w-4xl mx-auto pt-28 px-6">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Welcome to SynapSee
        </h1>

        <p className="text-gray-300 text-lg mb-10">
          Your intelligent vision companion — where AI meets simplicity.
        </p>

        {/* CARD GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

          {/* Recent Activity Card */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl hover:scale-[1.02] transition-all">
            <h2 className="text-2xl font-semibold">Recent Activity</h2>
            <p className="text-gray-300 mt-2">
              View your recent OCR scans and AI responses in one place.
            </p>

            <a
              href="/history"
              className="inline-block mt-4 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-medium"
            >
              Open History →
            </a>
          </div>

          {/* Quick Start */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl hover:scale-[1.02] transition-all">
            <h2 className="text-2xl font-semibold">Quick Start</h2>
            <p className="text-gray-300 mt-2">
              Capture, extract, and understand — all powered by AI.
            </p>

            <a
              href="/scanner"
              className="inline-block mt-4 bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg font-medium"
            >
              Start OCR →
            </a>
          </div>

          {/* Upload Document */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl hover:scale-[1.02] transition-all">
            <h2 className="text-2xl font-semibold">Upload Image</h2>
            <p className="text-gray-300 mt-2">
              Upload an image and let SynapSee extract everything instantly.
            </p>

            <a
              href="/upload"
              className="inline-block mt-4 bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded-lg font-medium"
            >
              Upload →
            </a>
          </div>

          {/* API Playground */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl hover:scale-[1.02] transition-all">
            <h2 className="text-2xl font-semibold">API Playground</h2>
            <p className="text-gray-300 mt-2">
              Test OCR & AI endpoints directly from your dashboard.
            </p>

            <a
              href="/api-test"
              className="inline-block mt-4 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg font-medium"
            >
              Open Playground →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
