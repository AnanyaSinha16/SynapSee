import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OcrDashboard from "./pages/OcrDashboard";
import About from "./pages/About";
import RecentActivity from "./pages/RecentActivity";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ocr-dashboard" element={<OcrDashboard />} />
        <Route path="/recent-activity" element={<RecentActivity />} />
      </Routes>
    </Router>
  );
}

export default App;
