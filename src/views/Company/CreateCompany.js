import React, { Component } from "react";
import { withAuth } from "../../context/authContext";
import apiCompany from "../../services/apiCompany";

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
        <h1>Create company</h1>
        <form onSubmit={this.handleSubmitForm}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={this.handleChange}
          />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            onChange={this.handleChange}
          />
          <label htmlFor="shareClientsInAllEstablishments">Do you want share the clients in all the establishments?</label>
          <input
            type="checkbox"
            name="shareClientsInAllEstablishments"
            id="shareClientsInAllEstablishments"
            onChange={this.handleCheckBox}
          />
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default withAuth(CreateCompany);