import React, { Component } from "react";

import { withAuth } from "../../context/authContext";
import apiCompany from "../../services/apiCompany";
import apiUser from "../../services/apiUser";

class ManageUsersOfCompany extends Component {

  state = {
    mail: undefined,
    user: undefined,
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
      this.setState({
        user
      })
    })
    .catch((error) => {
      console.log(error)
    });
  }

  addNewOwner(){
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

  // deleteOwner(){
  //   const { establishment, owner, refresh } = this.props;
  //   apiEstablishment
  //   .deleteOwnerEstablishment(establishment._id, owner._id)
  //   .then(() => {
  //     refresh()
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   });
  // }

  handleSubmitFormAddNewOwner = async(e) =>{
    e.preventDefault();
    await this.searchUserByMail();
    const { company , refresh } = this.props;
    const { user } = this.state;
    console.log("user en cuestion", user)
    apiCompany
    .joinOwnerCompany(company._id, user._id)
    .then(() => {
      refresh()
    })
    .catch((error) => {
      console.log(error)
    });
  }

  render(){
    const { addNewOwner, deleteOwner } = this.props;
    return (
      <div>
        {addNewOwner && this.addNewOwner()}
        {/* {deleteOwner && this.deleteOwner()} */}
      </div>
    )
  }
}

export default withAuth(ManageUsersOfCompany);
