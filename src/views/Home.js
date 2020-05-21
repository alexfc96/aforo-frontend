import React, { Component } from "react";

import { withAuth } from "../context/authContext";

class Home extends Component {
  render() {
    const { onLogout, user } = this.props;
    console.log(user)
    return (
      <div>
        <h1>Protected</h1>
        <p>Welcome {user.name}</p>
        <button onClick={onLogout}>Logout</button>
      </div>
    );
  }
}

export default withAuth(Home);
