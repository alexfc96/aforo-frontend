import React, { Component } from "react";
import { withAuth } from "../../context/authContext";
import apiCompany from "../../services/apiCompany";
import { Link } from "react-router-dom";

class MyCompanies extends Component {
  state = {
    admin: false,
    haveCompanyAssociated : undefined,
    companies : undefined,
    name: undefined,
    description: undefined,
    shareClientsInAllEstablishments: false,
    adminCompany: undefined
  }

  handleAdminButton = (company) => {
    console.log(company)
    this.setState({
      admin: !this.state.admin,
      adminCompany: company._id,
      name: company.name,
      description: company.description,
      shareClientsInAllEstablishments: company.shareClientsInAllEstablishments,
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleBoolean = (e) => {
    this.setState({
      shareClientsInAllEstablishments: !this.state.shareClientsInAllEstablishments,
    });
  };

  adminCompany(){
    const { name, description, shareClientsInAllEstablishments } = this.state;
    return (
      <form onSubmit={this.handleSubmitForm}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={this.handleChange}
        />
        <label htmlFor="description">description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={this.handleChange}
        />
        <label htmlFor="shareClientsInAllEstablishments">shareClientsInAllEstablishments</label>
        <input
          type="checkbox"
          name="shareClientsInAllEstablishments"
          id="shareClientsInAllEstablishments"
          checked={shareClientsInAllEstablishments? true : false}
          onChange={this.handleBoolean}
        />
        <input type="submit" value="submit" />
      </form>
    )
  }

  handleSubmitForm = (e) => {
    e.preventDefault();
    const { name, description, shareClientsInAllEstablishments, adminCompany } = this.state;
    const companyObj = { name, description, shareClientsInAllEstablishments }
    //const userObj = this.checkIfInputIsEmpty() //conseguir asincronía!!
    apiCompany
    .updateCompany(adminCompany, companyObj)
    .then(({ data:company }) => {
      this.getCompanies()
    })
    .catch((error) => {
      console.log(error)
    });
  };

  showCompany(){
    const {companies, admin, adminCompany} = this.state;
    const { user } = this.props;

    let owner = undefined;
    return companies.map((company) => {
      company.owners.includes(user._id) ? owner = true : owner = false;
      return <div key={company._id}>
              <div className="one-company-of-the-list">
                <div className="info-company"> 
                  <Link to={`/company/${company._id}` }><h3>{company.name}</h3></Link>
                  Description:{company.description}
                  {admin && adminCompany===company._id &&
                    this.adminCompany()
                  }
                  {owner && 
                  <div>
                    <button onClick={()=>{this.handleAdminButton(company)}}>Admin company</button>
                    <button onClick={()=>{this.deleteCompany(company._id)}}>Delete company</button>
                  </div>
                  }
                </div>
             </div>
             <hr/>
            </div>
    })
  }

  deleteCompany = (idCompany) => {
    apiCompany
    .deleteCompany(idCompany)
    .then((company) => {
      this.getCompanies()
    })
    .catch((error) => {
      console.log(error)
    });
  }

  getCompanies(){
    apiCompany
    .company()
    .then(({ data:company }) => {
      this.setState({
        haveCompanyAssociated : true,
        companies : company,
      });
    })
    .catch((error) => {
      console.log(error)
      this.setState({
        haveCompanyAssociated : false,
      });
    });
  }

  componentDidMount(){
    this.getCompanies()
  }

  render() {
    const { haveCompanyAssociated} = this.state;
    return (
      <div>
        <h1>My companies</h1>
        Do you want to control a new company?
        <Link to={`/company/create` }><button>Add new company</button></Link>
        {!haveCompanyAssociated && 
          <p> It seems that you dont have a company associated</p>
        }
        {haveCompanyAssociated && this.showCompany()}
      </div>
    );
  }
}

export default withAuth(MyCompanies);
