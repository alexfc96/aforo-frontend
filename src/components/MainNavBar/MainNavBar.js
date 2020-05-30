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
    const { toggle } = this.state;
    const { onLogout, isLoggedIn, user } = this.props;
    return (
      <div className="nav">
        <input type="checkbox" id="nav-check" onClick={this.handleToggle} />
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
        {/* {toggle &&
          <div> */}
          {isLoggedIn &&
          <div className="nav-links">
            <Link to="/company">Companys</Link>
            <Link to="/establishment">Establishments</Link>
            <Link to="/bookings">My bookings</Link>
            <Link to="/user">My profile</Link>
            <a onClick={onLogout}>Logout</a>
          </div>
        }
        {!isLoggedIn &&
          <div className="nav-links">
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </div>
          
        }
          {/* </div>
        } */}


      </div>
    );
  }
}

export default withAuth(MainNavBar);