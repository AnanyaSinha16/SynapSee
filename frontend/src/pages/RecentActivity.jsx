

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RecentActivity = () => {
  const [history, setHistory] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("ocrHistory")) || [];
    setHistory(savedHistory.reverse()); // Show latest first
  }, []);

  const toggleExpand = (index) => {
    setSelected(selected === index ? null : index);
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-[#120024] via-[#090014] to-black text-white flex flex-col items-center p-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h1 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-[#00ffff] to-[#b026ff] bg-clip-text text-transparent">
        Recent Activity
      </h1>

      {history.length === 0 ? (
        <p className="text-gray-400">No OCR scans found yet.</p>
      ) : (
        <div className="w-full max-w-3xl space-y-4">
          {history.map((entry, index) => (
            <motion.div
              key={index}
              layout
              className="bg-white/10 border border-[#00ffff33] rounded-xl p-4 cursor-pointer hover:shadow-[0_0_15px_#00ffff44] transition-all duration-300"
              onClick={() => toggleExpand(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-[#00ffff]">
                  🖼️ {entry.imageName || "Untitled Scan"}
                </h3>
                <p className="text-sm text-gray-400">
                  {new Date(entry.date).toLocaleString()}
                </p>
              </div>

              <AnimatePresence>
                {selected === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-3 text-sm text-gray-200 whitespace-pre-wrap border-t border-[#00ffff22] pt-3"
                  >
                    {entry.text || "⚠️ No text extracted."}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default RecentActivity;
