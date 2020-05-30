import React, { Component } from "react";
import styles from './mainNavBar.css'
import { Link } from "react-router-dom";

import { withAuth } from "../../context/authContext";

class MainNavBar extends Component {
  state = {
    toggle:false
  }
  
  handleToggle = () => {
    this.setState({toggle:!this.state.toggle})
  }

  render() {
    // const { toogle } = this.state;
    const { onLogout, isLoggedIn, user } = this.props;
    return (
      <div className="nav">
        <input type="checkbox" id="nav-check" />
        <div className="nav-header">
          <div className="nav-title">
            <a><Link to="/"><img className='nav-hack' id="logo-nav" src="./aforo.png" alt="logo"></img></Link></a>
            <span className="main-title">AFORO</span>
          </div>
        </div>
        <div className="nav-btn">
          <label for="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>

        {isLoggedIn &&
          <div className="nav-links">
            <Link to="/company"><a href="">Companys</a></Link>
            <Link to="/establishment"><a href="">Establishments</a></Link>
            <Link to="/bookings"><a href="">My bookings</a></Link>
            <Link to="/user"><a href="">My profile</a></Link>
            <a onClick={onLogout}>Logout</a>
          </div>
        }
        {!isLoggedIn &&
          <div className="nav-links">
            <Link to="/signup"><a href="">Signup</a></Link>
            <Link to="/login"><a href="">Login</a></Link>
          </div>
        }

      </div>
    );
  }
}

export default withAuth(MainNavBar);