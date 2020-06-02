import React, { Component } from "react";
import './mainNavBar.css'
import { Link } from "react-router-dom";

import { withAuth } from "../../context/authContext";

class MainNavBar extends Component {
  state = {
    toggle:false
  }
  
  handleToggle = () => {
    this.setState({
      toggle: !this.state.toggle
    })
  }

  handleToggleOff = () => {
    this.setState({
      toggle: false
    })
  }

  logout = () => {
    const { onLogout } = this.props;

    this.setState({toggle:!this.state.toggle})
    onLogout()
  }

  render() {
    const { toggle } = this.state;
    const { isLoggedIn } = this.props;
    return (
      <div className="nav">
        <input type="checkbox" id="nav-check" onClick={this.handleToggle} />
        <div className="nav-header">
          <div className="nav-title">
            <Link to="/" onClick={this.handleToggleOff}><img className='nav-hack' id="logo-nav" src="./aforo.png" alt="logo"></img></Link>
            <Link to="/"  onClick={this.handleToggleOff} style={{marginTop:"4px"}}><span className="main-title" style={{color:"black", marginRight: "31px"}}>AFORO</span></Link>
          </div>
        </div>
        <div className="nav-btn">
          <label htmlFor="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
        {toggle && //esto limita a solo pantallas pequeñas!
          <div className="nav-links">
            {isLoggedIn &&
            <div>
              <Link to="/company" onClick={this.handleToggle} >Companys</Link>
              <Link to="/establishment" onClick={this.handleToggle}>Establishments</Link>
              <Link to="/bookings" onClick={this.handleToggle}>My bookings</Link>
              <Link to="/user" onClick={this.handleToggle}>My profile</Link>
              <Link to="/login" onClick={this.logout}>Logout</Link>
            </div>
            }
            {!isLoggedIn &&
            <div>
              <Link to="/signup" onClick={this.handleToggle}>Signup</Link>
              <Link to="/login" onClick={this.handleToggle}>Login</Link>
            </div>
            }
          </div>
        }

      </div>
    );
  }
}

export default withAuth(MainNavBar);