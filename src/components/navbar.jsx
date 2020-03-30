import React from "react";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/movies">
        Vidly <i className="fa fa-film"></i>
      </Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/movies">
            Movies
            {/* <i class="fa fa-theater-masks"></i> */}
          </NavLink>
          <NavLink className="nav-item nav-link" to="/customers">
            Customers
            {/* <i className="fa fa-user-friends"></i> */}
          </NavLink>
          <NavLink className="nav-item nav-link" to="/rentals">
            Rentals
            {/* <i className="fa fa-palette"></i> */}
          </NavLink>
          <NavLink className="nav-item nav-link" to="/login">
            Login
          </NavLink>
          <NavLink className="nav-item nav-link" to="/register">
            Register
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
