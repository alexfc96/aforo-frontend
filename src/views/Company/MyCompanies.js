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
    shareClients: undefined,
    adminCompany: undefined
  }

  handleAdminButton = (companyID) => {
    console.log("admin id?", companyID)
    this.setState({
      admin: !this.state.admin,
      adminCompany: companyID
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  adminCompany(){
    return (
      <form onSubmit={this.handleSubmitForm}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={this.handleChange}
        />
        <label htmlFor="description">description</label>
        <input
          type="text"
          name="description"
          id="description"
          onChange={this.handleChange}
        />
        <label htmlFor="shareClients">shareClients</label>
        <input
          type="checkbox"
          name="shareClients"
          id="shareClients"
          onChange={this.handleChange}
        />
        <input type="submit" value="submit" />
      </form>
    )
  }

  handleSubmitForm = (e) => {
    e.preventDefault();
    const { name, description, shareClients, adminCompany } = this.state;
    const companyObj = { name, description, shareClients }
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
                    this.adminCompany(company._id)
                  }
                  {owner && 
                  <div>
                    <button onClick={()=>{this.handleAdminButton(company._id)}}>Admin company</button>
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
