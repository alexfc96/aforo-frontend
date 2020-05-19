import React, { Component } from "react";

import { withAuth } from "../../context/authContext";
import apiUser from "../../services/apiUser";
// import apiEstablishment from "../../services/apiEstablishment";
// import { Link } from "react-router-dom";

class User extends Component {

  state = {
    userObj : undefined,
    // establishment: undefined,
    // owners: [],
  }

  componentDidMount(){
    const userID = this.props.match.params.id;
    apiUser
    .getUser(userID)
    .then((user) => {
      this.setState({
        userObj: user.data
      })
    })
    .catch((error) => {
      console.log(error)
    });
  }

  render() {
    const { user } = this.props;
    const { userObj } = this.state;
    return (
      <div>
        {!userObj && 
        <p>Loading</p>
        }
        {userObj &&
          <div key={userObj._id} className="info-userObj">
            <h1>{userObj.name}</h1>
            Dar la opcion q suba una imagen.
            <h2>{userObj.mail}</h2>
            Si tiene company que aparezca lista.
            
          </div>
        }      
        </div>
    );
  }
}

export default withAuth(User);