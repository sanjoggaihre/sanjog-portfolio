import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.style.css";

export function Navbar() {
  return (
    <nav>
      <Link to="/">
        <h4 className="sg-logo">SG.</h4>
      </Link>
      <div className="navbar-links-wrapper">
        <Link to="/">
          <h4>Home</h4>
        </Link>
        <a href="/sanjog-portfolio/public/cv.pdf">
          <h4>CV</h4>
        </a>
        <Link to="/publications">
          <h4>Publications</h4>
        </Link>
        <Link to="/projects">
          <h4>Projects</h4>
        </Link>
        {/* <Link to="/about">
          <h4>About</h4>
        </Link> */}
      </div>
    </nav>
  );
}
