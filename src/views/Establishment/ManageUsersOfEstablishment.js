import React, { Component } from "react";

import { withAuth } from "../../context/authContext";
import apiEstablishment from "../../services/apiEstablishment";
import apiUser from "../../services/apiUser";

import '../../App.css'

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

  addNewClient(){
    return (
      <div>
        <h5>Add new Client</h5>
        <form onSubmit={this.handleSubmitFormAddNewClient}>
          <label htmlFor="mail">Mail</label>
          <input
            type="mail"
            name="mail"
            id="mail"
            onChange={this.handleChange}
          />
          <input type="submit" value="submit" className="btn-create-2" />
        </form>
      </div>
    )
  }

  addNewOwner(){
    return (
      <div>
        <h5>Add new Owner</h5>
        <form onSubmit={this.handleSubmitFormAddNewOwner}>
          <label htmlFor="mail">Mail</label>
          <input
            type="mail"
            name="mail"
            id="mail"
            onChange={this.handleChange}
          />
          <input type="submit" value="Add" className="btn-create-2" />
        </form>
      </div>
    )
  }

  handleSubmitFormAddNewClient = async(e) =>{
    e.preventDefault();
    await this.searchUserByMail();
    const { establishment, refresh } = this.props;
    const { user } = this.state;
    apiEstablishment
    .joinClientEstablishment(establishment._id, user._id)
    .then(() => {
      refresh()
    })
    .catch((error) => {
      console.log(error)
    });
  }

  deleteOwner(){
    const { establishment, owner, refresh } = this.props;
    console.log("entroooo")
    apiEstablishment
    .deleteOwnerEstablishment(establishment._id, owner._id)
    .then(() => {
      refresh()
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
    const { addNewOwner, deleteOwner, addNewClient } = this.props;
    return (
      <div>
        {addNewOwner && this.addNewOwner()}
        {deleteOwner && this.deleteOwner()}
        {addNewClient && this.addNewClient()}
      </div>
    )
  }
}

export default withAuth(ManageUsersOfEstablishment);
