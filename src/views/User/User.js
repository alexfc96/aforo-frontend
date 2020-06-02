import React, { Component } from "react";

import { withAuth } from "../../context/authContext";
import apiUser from "../../services/apiUser";
// import { Link } from "react-router-dom";

class User extends Component {

  state = {
    userObj : undefined,
  }

  componentDidMount(){
    const userID = this.props.match.params.id;
    apiUser
    .getUser(userID)
    .then(({ data: userObj}) => {
      this.setState({
        userObj
      })
    })
    .catch((error) => {
      console.log(error)
    });
  }

  render() {
    const { userObj } = this.state;
    return (
      <div>
        <h1>User profile</h1>
        {!userObj && <h5>Loading</h5>}
        {userObj && 
          <div className="info-user">
          <div>
            <h2>Name: {userObj.name}</h2>
            {userObj.years && <h3>Years: {userObj.years}</h3>}
            <h3>Mail: {userObj.mail}</h3>
          </div>
        </div>
        }
      </div>
    );
  }
}

export default withAuth(User);