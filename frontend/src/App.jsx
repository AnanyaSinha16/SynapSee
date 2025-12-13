import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FloatingNav from "./components/FloatingNav";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";

export default function App() {
  return (
    <Router>
      <FloatingNav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
