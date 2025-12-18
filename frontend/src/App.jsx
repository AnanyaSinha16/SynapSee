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
        {/* Default route goes to Home */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
        <Route path="/ocr-dashboard" element={<OcrDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;