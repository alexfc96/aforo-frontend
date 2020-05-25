import React, { Component } from "react";
import { withAuth } from "../../context/authContext";
import apiCompany from "../../services/apiCompany";
import { Link } from "react-router-dom";
import CreateCompany from "./CreateCompany";
import AdminCompany from "./AdminCompany";

class MyCompanies extends Component {
  state = {
    admin: false,
    haveCompanyAssociated : undefined,
    companies : undefined,
    name: undefined,
    description: undefined,
    shareClientsInAllEstablishments: false,
    adminCompany: undefined,
    createCompany: false,
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleAdminButton = (company) => {
    this.setState({
      admin: !this.state.admin,
      adminCompany: company._id,
      name: company.name,
      description: company.description,
      shareClientsInAllEstablishments: company.shareClientsInAllEstablishments,
    });
    this.getCompanies()
  }

  handleCreateCompany = () => {
    this.setState({
      createCompany: !this.state.createCompany,
    });
    this.getCompanies()
  };

  showCompany(){
    const {companies, admin, adminCompany} = this.state;
    const { user } = this.props;
    console.log(companies)

    let owner = undefined;
    return companies.map((company) => {
      console.log("company:",company)
      company.owners.includes(user._id) ? owner = true : owner = false;
      return <div key={company._id}>
              <div className="one-company-of-the-list">
                <div className="info-company"> 
                  <Link to={`/company/${company._id}` }><h3>{company.name}</h3></Link>
                  Description:{company.description}
                  {admin && adminCompany===company._id &&
                    <AdminCompany company={company} refresh={this.handleAdminButton} />
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
    .then(({ data:companies }) => {
      this.setState({
        haveCompanyAssociated : true,
        companies
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
    const { haveCompanyAssociated, createCompany} = this.state;
    return (
      <div>
        <h1>My companies</h1>
        Do you want to control a new company?
        <button onClick={this.handleCreateCompany}>Add new company</button>
        {createCompany && <CreateCompany refresh={this.handleCreateCompany} />}
        {!haveCompanyAssociated && 
          <p> It seems that you dont have a company associated</p>
        }
        {haveCompanyAssociated && this.showCompany()}
      </div>
    );
  }
}

export default withAuth(MyCompanies);
