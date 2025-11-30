export default function Footer() {
  return (
    <footer className="w-full mt-20 bg-white/5 backdrop-blur-xl border-t border-white/10 py-6 px-6 text-center text-gray-300">
      <div className="max-w-6xl mx-auto">

        <h3 className="text-xl font-semibold text-white mb-2">
          SynapSee
        </h3>

        <p className="text-sm text-gray-400 mb-4">
          Your intelligent vision companion — powered by AI.
        </p>

        <div className="flex justify-center gap-6 text-gray-400 text-sm">
          <a href="/" className="hover:text-white transition">Home</a>
          <a href="/history" className="hover:text-white transition">History</a>
          <a href="/scanner" className="hover:text-white transition">Scan</a>
          <a href="/upload" className="hover:text-white transition">Upload</a>
          <a href="/api-test" className="hover:text-white transition">API Test</a>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          © {new Date().getFullYear()} SynapSee. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
