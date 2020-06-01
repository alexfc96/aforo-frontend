import React, { Component } from "react";
import { withAuth } from "../../context/authContext";
import apiCompany from "../../services/apiCompany";
import './company.css'

class AdminCompany extends Component {
  state = {
    name: "",
    description: "",
    shareClientsInAllEstablishments: undefined,
  }

  handleBoolean = (e) => {
    this.setState({
      shareClientsInAllEstablishments: !this.state.shareClientsInAllEstablishments,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmitForm = (e) => {
    e.preventDefault();
    const { company, refresh } = this.props;
    const { name, description, shareClientsInAllEstablishments } = this.state;
    const companyObj = { name, description, shareClientsInAllEstablishments };
    //const userObj = this.checkIfInputIsEmpty() //conseguir asincronía!!
    apiCompany
    .updateCompany(company._id, companyObj)
    .then(({ data:company }) => {
      refresh(company)
    })
    .catch((error) => {
      console.log(error)
    });
  };

  componentDidMount(){
    const { company } = this.props;
    this.setState({
      name: company.name,
      description: company.description,
      shareClientsInAllEstablishments: company.shareClientsInAllEstablishments,
    })
  }

  render() {
    const { name, description, shareClientsInAllEstablishments } = this.state;
    return (
      <div>
        <h1>Admin company</h1>
        <form onSubmit={this.handleSubmitForm}>
          <label htmlFor="name">Name</label>
          <span className="br-for-mobile"><input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={this.handleChange}
          /></span>
          <label htmlFor="description">description</label>
          <span className="br-for-mobile"><textarea
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={this.handleChange}
          /></span>
          <label htmlFor="shareClientsInAllEstablishments">shareClientsInAllEstablishments</label>
          <span className="br-for-mobile"><input
            type="checkbox"
            name="shareClientsInAllEstablishments"
            id="shareClientsInAllEstablishments"
            checked={shareClientsInAllEstablishments? true : false}
            onChange={this.handleBoolean}
          /></span>
          <input type="submit" value="Update" />
        </form>
      </div>
    );
  }
}

export default withAuth(AdminCompany);