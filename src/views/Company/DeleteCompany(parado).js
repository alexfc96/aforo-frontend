import React, { Component } from "react";
import { withAuth } from "../../context/authContext";
import apiCompany from "../../services/apiCompany";

class DeleteCompany extends Component {
  state = {
    name: "",
    description: "",
    shareClientsInAllEstablishments: false,
  }

  deleteCompany = (idCompany) => {
    const { refresh } = this.props;
    console.log("pa borrar", idCompany)
    apiCompany
    .deleteCompany(idCompany)
    .then(() => {
      refresh()
    })
    .catch((error) => {
      console.log(error)
    });
  }

  componentDidMount(){
    const { idCompany } = this.props;
    this.deleteCompany(idCompany);
  }

  render() {
    return null
  }
}

export default withAuth(DeleteCompany);