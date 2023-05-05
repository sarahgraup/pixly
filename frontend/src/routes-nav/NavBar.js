import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import "./NavBar.css";

/**Component for NavBar
 *
 * renders navigation bar for every page on site
 *
 * State: none
 *
 * Props: handleBackToHome parent fn to use when navigating back to home
 *
 * Links to: "/gallery", "gallery/upload"
 *
 * App -> Nav
 */
//Bug: fix racewar
function NavBar({ handleBackToHome }) {
  return (
    <nav className="NavBar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/gallery" onClick={handleBackToHome}>
          Pixly
        </Link>
        <Nav className="Navbar" navbar>
          <NavItem className="NavItem">
            <NavLink className="NavLink" to="/images/upload">Upload</NavLink>
          </NavItem>
          <NavItem className="NavItem">
            <NavLink className="NavLink" to="/gallery" onClick={handleBackToHome}>Gallery</NavLink>
          </NavItem>
        </Nav>
      </div>
    </nav>
  );
}
export default NavBar;