import React, { Component } from "react";

import { withAuth } from "../../context/authContext";
import apiCompany from "../../services/apiCompany";
import apiEstablishment from "../../services/apiEstablishment";
import { Link } from "react-router-dom";
import ManageUsersOfCompany from "./ManageUsersOfCompany";

import './company.css'

class Company extends Component {

  state = {
    company : undefined,
    establishments: [],
    adminOwners: false,
    iAmOwner: false,
    deleteOwner: false,
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

  handleDeleteOwner = () => {
    this.setState({
      deleteOwner: !this.state.deleteOwner,
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
    const { company, establishments, adminOwners, iAmOwner, deleteOwner } = this.state;
    return (
      <div>
        {!company && <p>Loading</p>}
        {company &&
          <div key={company._id} className="info-company">
            <h1>{company.name}</h1>
            {iAmOwner && 
              <div>
                {/* <p>Eres el owner de la company</p> */}
                {/* <button style={{color:"red"}} 
                // onClick={()=>{this.deleteCompany(company._id)}}
                onClick={e =>
                      window.confirm("Are you sure you wish to delete this company? All associated clients and owners and their bookings will be deleted.") &&
                      this.deleteCompany(company._id)
                      }
                >Delete Company</button> */}
               </div>
            }
            <h5 style={{textAlign:"center"}}>{company.description}</h5>
            {/* <img className="img-of-company" src={company.image_url} alt={company.name} /> */}
            <p>Establishments:</p>
              {establishments && 
                <ul>
                  {establishments.map((establishment)=>{
                    return <li key={establishment._id}>
                            <Link to={`/establishment/${establishment._id}`}><h3>{establishment.name}</h3></Link>
                          </li>
                  })}
                </ul>
              }
            <div>
              <div className="admin-owners">
              Created by:   
              {iAmOwner && 
              <button className="btn-right" onClick={this.handleAdminOwnersButton}>Admin owners</button>
              }
              </div>
              {adminOwners && 
                <ManageUsersOfCompany company={company} refresh={this.handleAdminOwnersButton} addNewOwner={"True"} />
              }
            </div>
            <ul>
              {company.owners.map((owner, index)=>{
                return <li key={owner._id}>
                        <Link to={`/user/${company.owners[index]._id}` }><h3>{owner.name}</h3></Link>
                        {iAmOwner && adminOwners &&
                              <div>
                                <button 
                                // onClick={this.handleDeleteOwner}
                                style={{color:"red"}} 
                                onClick={e =>
                                window.confirm("Are you sure you want to delete this owner? It will be deleted from all the establishments of this company where it was the owner and its bookings.") &&
                                this.handleDeleteOwner
                                }
                                >Delete owner</button>
                                {deleteOwner &&
                                  <ManageUsersOfCompany company={company} refresh={this.handleDeleteOwner} deleteOwner={"True"} owner={owner} />
                                }
                              </div>
                            }
                        </li>
              }
              )}
            </ul>
          </div>
        }      
        </div>
    );
  }
}

export default withAuth(Company);

