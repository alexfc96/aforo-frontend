import React, { Component } from "react";
// import { Link } from "react-router-dom";

import { withAuth } from "../../context/authContext";

class SignUp extends Component {
  state = {
    username: "",
    password: "",
    name: "",
    mail: "",
    years: 0,
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
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            value={username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="name"
            id="name"
            placeholder="name"
            value={name}
            onChange={this.handleChange}
          />
          <input
            type="email"
            name="mail"
            id="mail"
            placeholder="mail"
            value={mail}
            onChange={this.handleChange}
          />
          <input
            type="number"
            name="years"
            id="years"
            placeholder="years"
            value={years}
            onChange={this.handleChange}
          />
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default withAuth(SignUp);