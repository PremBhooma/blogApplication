import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      {/* Navbar Start */}
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand">
            <Link to={"/"}>MyBlog</Link>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link">
                  <Link to={"/login"}>Login</Link>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">
                  <Link to={"/signup"}>Register</Link>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Navbar End  */}
    </div>
  );
};

export default Header;
