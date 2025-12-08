import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./home.css";  // ✅ THIS MUST EXIST NOW

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
