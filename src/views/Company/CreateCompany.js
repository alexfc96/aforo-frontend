import React, { Component } from "react";
import { withAuth } from "../../context/authContext";
import apiCompany from "../../services/apiCompany";
import './company.css'
import '../../App.css'

class CreateCompany extends Component {
  state = {
    name: "",
    description: "",
    shareClientsInAllEstablishments: false,
  }

  handleCheckBox = (e) => {
    this.setState({
      shareClientsInAllEstablishments: !this.state.shareClientsInAllEstablishments,
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmitForm = (e) => {
    e.preventDefault();
    const { name, description, shareClientsInAllEstablishments} = this.state;
    const { refresh } = this.props;
    console.log("refresh",refresh)
    const companyObj = { name, description, shareClientsInAllEstablishments}
    apiCompany
    .createCompany(companyObj)
    .then(() => {
      refresh()
    })
    .catch((error) => {
      console.log(error)
    });
  };

  render() {
    return (
      <div>
        <h3>Create company</h3>
        <form onSubmit={this.handleSubmitForm}>
          <label htmlFor="name">Name</label>
          <span className="br-for-mobile"><input
            type="text"
            name="name"
            id="name"
            required
            onChange={this.handleChange}
          /></span>                        
          <label htmlFor="description">Description</label>
          <span className="br-for-mobile"><textarea
            type="text"
            name="description"
            id="description"
            onChange={this.handleChange}
            cols={20} rows={3}
          /></span>                           
          <label htmlFor="shareClientsInAllEstablishments">Do you want share the clients in all the establishments?</label>
          <span className="br-for-mobile"><input
            type="checkbox"
            name="shareClientsInAllEstablishments"
            id="shareClientsInAllEstablishments"
            onChange={this.handleCheckBox}
          /></span>
          <input className="btn-create" type="submit" value="Create" />
        </form>
        <hr/>
      </div>
    );
  }
}

export default withAuth(CreateCompany);