import React, { Component } from "react";
import './mainNavBar.css'
import { Link } from "react-router-dom";
// import logo from "./aforo.png";   //no pilla la ruta public...

import { withAuth } from "../../context/authContext";

class MainNavBar extends Component {
  // state = {
  //   username : "",
  // }
  
  render() {
    // const { username } = this.state;
    const { onLogout, isLoggedIn } = this.props;
    return (
      <div className="mainNavBar">
        {!isLoggedIn &&         
        <nav>
          {/* <img src={logo} alt="logo" /> */}
          <h1><Link to="/" className="">AFORO</Link></h1>
          <ul className="mainLinks">
            <li>
              <Link to="/login" className="">Login</Link>
            </li>
            <li>
              <Link to="/signup" className="">Signup</Link>
            </li>
          </ul>
        </nav>
        }

        {isLoggedIn && 
          <nav>
          <h1><Link to="/home" className="">AFORO</Link></h1>
          <ul className="mainLinks">
            <li>
              <Link to="/company" className="">My companies</Link>
            </li>
            <li>
              <Link to="/establishment" className="">My establishments</Link>
            </li>
            <li>
              <Link to="/bookings" className="">My bookings</Link>
            </li>
            <li>
              <Link to="/user" className="">My user</Link>
            </li>
            <li>
              <button onClick={onLogout}>Logout</button>
            </li>
          </ul>
        </nav>
        }

      </div>
    );
  }
}

export default withAuth(MainNavBar);