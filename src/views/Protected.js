import React, { Component } from "react";

import { withAuth } from "../context/authContext";

class Resorts extends Component {
  render() {
    const { onLogout, user } = this.props;
    return (
      <div>
        <h1>Protected</h1>
        <p>Welcome {user.name}</p>
        <button onClick={onLogout}>Loogut</button>
      </div>
    );
  }
}

export default withAuth(Resorts);
