import React, { useContext, useEffect, useState } from "react";
import "../../App.css";
import { Link, useHistory } from "react-router-dom";
import "./NavbarElements.css";
import { NavLink } from "react-router-dom";
// import { UserContext } from "../../App";

function NavBar() {
  const [click, setClick] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [items, setItems] = useState([]);

  const handleClick = () => setClick(!click);
  const history = useHistory();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("user"));
    if (items) {
      setItems(items);
      setLoggedIn(true);
      console.log("User is Logged in");
    }
  }, [loggedIn]);
  // console.log(loggedIn);

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            Wash Up
            <i className="fas fa-code"></i>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {loggedIn ? (
              <>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/search"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Search
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/contact"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Contact Us
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/"
                    activeClassName="active"
                    className="nav-links"
                    onClick={() => {
                      localStorage.clear();
                      history.push("/signin");
                    }}
                  >
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/signin"
                    activeClassName="active"
                    className="nav-links"
                  >
                    SignIn
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/signup"
                    activeClassName="active"
                    className="nav-links"
                  >
                    SignUp
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
