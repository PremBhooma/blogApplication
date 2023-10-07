import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Routes/AuthContext";

const Header = () => {
  // const [login, setLogin] = useState(localStorage.getItem("token") || null);
  const { token, setToken } = useContext(AuthContext);
  // const [logout, setLogout] = useState(localStorage.getItem("token") || null);

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
            {token ? (
              <ul className="navbar-nav ms-auto">
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
                        setToken(null);
                      }}
                    >
                      Logout
                    </Link>
                  </a>
                </li>
              </ul>
            ) : (
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
            )}
          </div>
        </div>
      </nav>

      {/* Navbar End  */}
    </div>
  );
};

export default Header;
