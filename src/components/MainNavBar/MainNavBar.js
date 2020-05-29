import React, { Component } from "react";
import styles from './mainNavBar.module.css'
import { Link } from "react-router-dom";
// import logo from "../../aforo.png";

import { withAuth } from "../../context/authContext";

class MainNavBar extends Component {
  
  render() {
    // const { username } = this.state;
    const { onLogout, isLoggedIn } = this.props;
    return (
      <div className={styles.mainNavBar}>
        <nav>
          <div className={styles.mainLogo}>
            <img src="./aforo.png" alt="logo" className={styles.logo} />
            <h1><Link to="/" className="">AFORO</Link></h1>
          </div>
            {!isLoggedIn &&   
              <ul>    
                <li>
                  <Link to="/login" className="">Login</Link>
                </li>
                <li>
                  <Link to="/signup" className="">Signup</Link>
                </li>
              </ul>
            }
            {isLoggedIn && 
              <ul>      
                <li>
                  <Link to="/company" className="">My companies</Link>
                </li>
                <li>
                  <Link to="/establishment" className="">My establishments</Link>
                </li>
                <li>
                  {/* valorar si merece la pena */}
                  <Link to="/bookings" className="">My bookings</Link>
                </li>
                <li>
                  <Link to="/user" className="">My user</Link>
                </li>
                <li>
                  <button onClick={onLogout}>Logout</button>
                </li>
              </ul>
            }
        </nav>
      </div>
    );
  }
}

export default withAuth(MainNavBar);