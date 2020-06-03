import React, { Component } from "react";
import { withAuth } from "../../context/authContext";
import apiCompany from "../../services/apiCompany";
import { Link } from "react-router-dom";
import CreateCompany from "./CreateCompany";
import AdminCompany from "./AdminCompany";
import '../../App.css'

class MyCompanies extends Component {
  state = {
    admin: false,
    haveCompanyAssociated : undefined,
    haveCompany : undefined,
    companies : undefined,
    myCompanies : undefined,
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

  refresh(){
    window.location.reload(false);
  }

  handleCreateCompany = () => {
    this.setState({
      createCompany: !this.state.createCompany,
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

  showMyCompany(){
    const {myCompanies, admin, adminCompany} = this.state;
    const { user } = this.props;

    let owner = undefined;
    return myCompanies.map((company) => {
      company.owners.includes(user._id) ? owner = true : owner = false;
      return <div key={company._id}>
              <div className="one-company-of-the-list">
                <div className="info-company"> 
                  <Link to={`/company/${company._id}` }><h3>{company.name}</h3></Link>
                  Description:{company.description}
                  {owner && 
                  <div>
                    <button onClick={()=>{this.handleAdminButton(company)}}>Admin company</button>
                    <button style={{color:"red"}} 
                      // onClick={()=>{this.deleteCompany(company._id)}}
                      onClick={e =>
                      window.confirm("Are you sure you wish to delete this company? All associated clients and owners and their bookings will be deleted.") &&
                      this.deleteCompany(company._id)
                      }
                    >Delete company</button>
                  </div>
                  }
                  {admin && adminCompany===company._id &&
                    <AdminCompany company={company} refresh={this.handleAdminButton} />
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
      this.getMyCompanies()
      window.location.reload(false);
    })
    .catch((error) => {
      console.log(error)
    });
  }

  getCompanies(){ //where I am client
    apiCompany
    .company()
    .then(({ data:companies }) => {
      const { myCompanies } = this.state;
      if(myCompanies){
        for (let i = 0; i < myCompanies.length; i++) {
          for (let x = 0; x < companies.length; x++) {
            if(myCompanies[i]._id===companies[x]._id){
              companies.splice(x, 1)
            }
          }
        }
      }
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

  getMyCompanies(){ //where I am owner
    apiCompany
    .myCompanies()
    .then(({ data:myCompanies }) => {
      this.setState({
        haveCompany : true,
        myCompanies
      });
    })
    .catch((error) => {
      console.log(error)
      this.setState({
        haveCompany : false,
      });
    });
  }

  componentDidMount(){
    this.getMyCompanies()
    this.getCompanies()
  }

  render() {
    const { haveCompanyAssociated, haveCompany, createCompany} = this.state;
    return (
      <div>
        <h1>My companies</h1>
        <p>Do you want to control a new company?</p>
        <button onClick={this.handleCreateCompany} className="btn-create">Add new company</button>
        {createCompany && <CreateCompany refresh={this.refresh} />}
        {!haveCompanyAssociated && !haveCompany &&
          <p> It seems that you dont have a company associated</p>
        }
        {haveCompanyAssociated && this.showCompany()}
        {haveCompany && this.showMyCompany()}
      </div>
    );
  }
}

export default withAuth(MyCompanies);
