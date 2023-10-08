import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Routes/AuthContext";
import "./Header.css";

const Header = () => {
  const { token, setToken } = useContext(AuthContext);

  return (
    <div className="headStyle">
      {/* Navbar Start */}
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand fw-bolder fs-2">
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
            {token ? (
              <ul className="navbar-nav ms-auto fw-medium">
                <li className="nav-item">
                  <a className="nav-link">
                    <Link to={"/blog/create"}>Create Blog</Link>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">
                    <Link
                      to={"/"}
                      onClick={() => {
                        localStorage.clear("token");
                        localStorage.clear("user");
                        setToken(null);
                      }}
                    >
                      Logout
                    </Link>
                  </a>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ms-auto fw-medium">
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
            )}
          </div>
        </div>
      </nav>

      {/* Navbar End  */}
    </div>
  );
};

export default Header;
