import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import Upload from "./pages/Upload";
import Scanner from "./pages/Scanner";
import ApiTest from "./pages/ApiTest";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/api-test" element={<ApiTest />} />
      </Routes>
      <Footer />
    </>
  );
}
