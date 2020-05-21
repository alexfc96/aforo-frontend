import React, { Component } from "react";
import { withAuth } from "../../context/authContext";
import apiCompany from "../../services/apiCompany";

class CreateCompany extends Component {
  state = {
    name: "",
    description: "",
    shareClients: false,
  }

  handleCheckBox = (e) => {
    this.setState({
      shareClients: !this.state.shareClients,
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmitForm = (e) => {
    e.preventDefault();
    const { name, description, shareClients} = this.state;
    const { history } = this.props;
    const companyObj = { name, description, shareClients}
    apiCompany
    .createCompany(companyObj)
    .then(({ data:company }) => {
      console.log(company)
      history.push(`/company/`);
    })
    .catch((error) => {
      console.log(error)
      this.setState({
        haveCompanyAssociated : false,
      });
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
          <label htmlFor="shareClients">Do you want share the clients in all the establishments?</label>
          <input
            type="checkbox"
            name="shareClients"
            id="shareClients"
            onChange={this.handleCheckBox}
          />
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default withAuth(CreateCompany);