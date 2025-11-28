import { useCallback } from "react";
import { loadSlim } from "@tsparticles/slim";
import Particles from "@tsparticles/react";

export default function Home() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="relative min-h-screen pt-24 px-6">
      
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: true },
          background: { color: "#0a0a0a" },
          particles: {
            number: { value: 60 },
            size: { value: 2 },
            move: { enable: true, speed: 0.6 },
            links: { enable: true, color: "#ffffff22", distance: 130 },
          },
        }}
        className="absolute inset-0 -z-10"
      />

      <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
        Welcome to SynapSee
      </h1>

      <p className="text-gray-300 text-lg mt-3">
        Your intelligent vision platform — where AI meets simplicity.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 max-w-4xl">
        <HomeCard title="Recent Activity" link="/history" />
        <HomeCard title="Scan Now" link="/scanner" />
        <HomeCard title="Upload Image" link="/upload" />
        <HomeCard title="API Playground" link="/api-test" />
      </div>
    </div>
  );
}

function HomeCard({ title, link }) {
  return (
    <a
      href={link}
      className="bg-white/10 p-6 rounded-xl border border-white/20 hover:scale-[1.03] transition-all backdrop-blur-lg"
    >
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-gray-300 mt-2">Click to open</p>
    </a>
  );
}
