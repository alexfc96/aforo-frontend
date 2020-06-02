import React, { Component } from "react";
import { withAuth } from "../../context/authContext";

import './auth.css'
import '../../App.css'

class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const { onLogin } = this.props;
    if (username !== "" && password !== "") {
      onLogin({ username, password });
    }
  };

  cleanForm = () => {
    this.setState({
      username: "",
      password: "",
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { username, password } = this.state;
    const { error } = this.props;
    // console.log(error)
    
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit} className="auth-form">
          <p>Your username:</p>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            value={username}
            required
            onChange={this.handleChange}
          />
          <p>Your password</p>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            required
            value={password}
            onChange={this.handleChange}
          />
          <p><input type="submit" value="Login" className="btn-create" /></p>
        </form>
        {error}
      </div>
    );
  }
}

export default withAuth(Login);
