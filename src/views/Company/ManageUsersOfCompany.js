import React, { Component } from "react";

import { withAuth } from "../../context/authContext";
import apiCompany from "../../services/apiCompany";
import apiUser from "../../services/apiUser";

import '../../App.css'

class ManageUsersOfCompany extends Component {

  state = {
    mail: undefined,
    user: undefined,
    error: undefined
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
    const { error } = this.state;
    return (
      <div>
        <h4 style={{textAlign:"center"}}>Add new Owner</h4>
        <form onSubmit={this.handleSubmitFormAddNewOwner} className="new-owner">
          <label htmlFor="mail">Mail</label>
          <input
            type="mail"
            name="mail"
            id="mail"
            onChange={this.handleChange}
          />
          <input type="submit" value="Invite" className="btn-create" />
        </form>
        {error}
      </div>
    )
  }

  deleteOwner(){
    const { company, owner, refresh } = this.props;
    console.log("voy a deletear!!")
    apiCompany
    .deleteOwnerCompany(company._id, owner._id)
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
    const { company , refresh } = this.props;
    const { user } = this.state;
    if(user){
      console.log("user en cuestion", user)
      apiCompany
      .joinOwnerCompany(company._id, user._id)
      .then(() => {
        refresh()
      })
      .catch((error) => {
        console.log(error)
      });
    } else{
      this.setState({
        error: "This mail not exists"
      })
    }

  }

  render(){
    const { addNewOwner, deleteOwner } = this.props;
    return (
      <div>
        {addNewOwner && this.addNewOwner()}
        {deleteOwner && this.deleteOwner()}
      </div>
    )
  }
}

export default withAuth(ManageUsersOfCompany);
