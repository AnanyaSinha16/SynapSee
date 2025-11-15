import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/home" className={location.pathname === "/home" ? "active" : ""}>
        Home
      </Link>

      <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>
        About
      </Link>

      <Link to="/login" className={location.pathname === "/login" ? "active" : ""}>
        Login
      </Link>
    </nav>
  );
};

export default Navbar;
