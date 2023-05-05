import React from "react";

import { NavLink, Link } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";

/**Component for NavBar
 * 
 * renders navigation bar for every page on site
 * 
 * State: none
 * 
 * Props: none
 * 
 * Links to: "/gallery", "gallery/upload"
 * 
 * App -> Nav
 */
function NavBar() {
    return (
      <nav className="NavBar navbar navbar-expand-md">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/gallery">
            Pixly
          </Link>
          <Nav className="ms-auto" navbar>
            <NavItem>
              <NavLink to="/gallery/upload">Upload</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/gallery">Gallery</NavLink>
            </NavItem>
          </Nav>
        </div>
      </nav>
    );
  }
  
  export default NavBar;