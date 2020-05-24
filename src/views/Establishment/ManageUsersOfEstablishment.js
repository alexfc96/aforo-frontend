import React, { Component } from "react";

import { withAuth } from "../../context/authContext";
import apiEstablishment from "../../services/apiEstablishment";
import apiUser from "../../services/apiUser";

class ManageUsersOfEstablishment extends Component {

  state = {
    email: undefined,
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  async searchUserByMail(){
    const { mail } = this.state;
    await apiUser
    .getUserByMail(mail)
    .then(({ data: user }) => {
      // return user
      this.setState({
        user
      })
    })
    .catch((error) => {
      console.log(error)
    });
  }

  handleSubmitFormAddNewOwner = async(e) =>{
    e.preventDefault();
    await this.searchUserByMail();
    const { establishment, refresh } = this.props;
    const { user } = this.state;
    apiEstablishment
    .joinOwnerEstablishment(establishment._id, user._id)
    .then(() => {
      refresh()
    })
    .catch((error) => {
      console.log(error)
    });
  }

  render(){

    return (
      <div>
        <p>Add new Owner</p>
        <form onSubmit={this.handleSubmitFormAddNewOwner}>
          <label htmlFor="mail">Mail</label>
          <input
            type="mail"
            name="mail"
            id="mail"
            onChange={this.handleChange}
          />
          <input type="submit" value="submit" />
        </form>
      </div>
    )
  }
}

export default withAuth(ManageUsersOfEstablishment);
