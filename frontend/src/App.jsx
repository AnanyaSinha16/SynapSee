import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OcrDashboard from "./pages/OcrDashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>

        {/* Default route */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Pages */}
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ⭐ QUICK START OCR PAGE */}
        <Route path="/ocr-dashboard" element={<OcrDashboard />} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/home" replace />} />

      </Routes>
    </Router>
  );
}

export default App;
