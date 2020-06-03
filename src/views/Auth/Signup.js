import React, { Component } from "react";
import './auth.css'

import { withAuth } from "../../context/authContext";

class SignUp extends Component {
  state = {
    username: "",
    password: "",
    name: "",
    mail: "",
    years: undefined,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, name, mail, years } = this.state;
    const { onSignup } = this.props;
    if (username !== "" && password !== "" && mail !== "") {
      onSignup({ username, password, name, mail, years });
    }
  };

  cleanForm = () => {
    this.setState({
      username: "",
      password: "",
      name: "",
      mail: "",
      years: 0,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { username, password, name, mail, years } = this.state;

    return (
      <div>
        <h1>SignUp</h1>
        <form onSubmit={this.handleSubmit} className="auth-form">
          <p>Username:
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            required
            value={username}
            onChange={this.handleChange}
          />*
          </p>
          <p>Password:
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            required
            minLength="6"
            value={password}
            onChange={this.handleChange}
          />*
          </p>
          <p>Your name:
          <input
            type="text"
            name="name"
            id="name"
            placeholder="name"
            required
            value={name}
            onChange={this.handleChange}
          />*
          </p>
          <p>Email:
          <input
            type="email"
            name="mail"
            id="mail"
            placeholder="mail"
            required
            value={mail}
            onChange={this.handleChange}
          />*
          </p>
          <p>Years:
          <input
            type="number"
            name="years"
            id="years"
            placeholder="years"
            value={years}
            onChange={this.handleChange}
          />
          </p>
          <input type="submit" value="Signup" />
        </form>
      </div>
    );
  }
}

export default withAuth(SignUp);