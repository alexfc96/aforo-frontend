import React, { Component } from "react";

import { withAuth } from "../../context/authContext";
import apiCompany from "../../services/apiCompany";
import apiEstablishment from "../../services/apiEstablishment";
import { Link } from "react-router-dom";
import ManageUsersOfCompany from "./ManageUsersOfCompany";

class Company extends Component {

  state = {
    company : undefined,
    owners: [],
    establishments: [],
    adminOwners: false,
    iAmOwner: false,
  }

  getEstablishments(){
    //search establishments by company
    const { company } = this.state;

    apiEstablishment
      .getEstablishmentByCompany(company._id)
      .then(( { data: establishments }) => {
        this.setState({
          establishments
        });
      })
      .catch((error) => {
        console.log(error)
      });
  }

  iAmOwner(){
    const { company } = this.state;
    const { user } = this.props;

    company.owners.map((owner)=>{
      console.log(owner)
      if(owner._id === user._id){
        owner = true;
        this.setState({
          iAmOwner: true
        })
      };
    })
  }

  handleAdminOwnersButton = () => {
    this.setState({
      adminOwners: !this.state.adminOwners,
    });
    this.getCompany()
  }

  deleteCompany = (idCompany) => {
    const { history } = this.props;
    apiCompany
    .deleteCompany(idCompany)
    .then((company) => {
      history.push("/company")
    })
    .catch((error) => {
      console.log(error)
    });
  }

  getCompany(){
    const companyID = this.props.match.params.id;
    apiCompany
    .getCompany(companyID)
    .then(({ data: company }) => {
      this.setState({
        company
      });
      this.iAmOwner()
      this.getEstablishments()
    })
    .catch((error) => {
      console.log(error)
    });
  }

  componentDidMount(){
    this.getCompany()
  }

  render() {
    const { user } = this.props;
    const { company, owners, establishments, adminOwners, iAmOwner } = this.state;
    console.log(iAmOwner)
    return (
      <div>
        {!company && <p>Loading</p>}
        {company &&
          <div key={company._id} className="info-company">
            <h1>{company.name}</h1>
            {iAmOwner && 
              <div>
                <p>Eres el owner de la company</p>
                <button onClick={()=>{this.deleteCompany(company._id)}}>Delete Company</button>
               </div>
            }
            {/* <img className="img-of-company" src={company.image_url} alt={company.name} /> */}
            <h5>{company.description}</h5>
            Created by :
              {iAmOwner && 
                <div>
                  <button onClick={this.handleAdminOwnersButton}>Admin owners of company</button>
                  {adminOwners && 
                    <ManageUsersOfCompany company={company} refresh={this.handleAdminOwnersButton} addNewOwner={"True"} />
                  }
                </div>
              }
              {owners && 
                <ul>
                  {company.owners.map((owner, index)=>{
                    return <li key={owner._id}>
                            <Link to={`/user/${company.owners[index]._id}` }><h3>{owner.name}</h3></Link>
                           </li>
                  })}
                </ul>
              }
            <p>Establishments:</p>
              {establishments && 
                <ul>
                  {establishments.map((establishment)=>{
                    {/* console.log(establishment) */}
                    return <li key={establishment._id}>
                            <Link to={`/establishment/${establishment._id}` }><h3>{establishment.name}</h3></Link>
                          </li>
                  })}
                </ul>
              }
          </div>
        }      
        </div>
    );
  }
}

export default withAuth(Company);

