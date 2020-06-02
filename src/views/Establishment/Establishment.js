import React, { Component } from "react";

import { withAuth } from "../../context/authContext";
import apiEstablishment from "../../services/apiEstablishment";
import { Link } from "react-router-dom";
import CreateBooking from "../Bookings/CreateBooking";
import AdminEstablishment from "./AdminEstablishment";
import ManageUsersOfEstablishment from "./ManageUsersOfEstablishment";

import './establishment.css'

class Establishment extends Component {

  state = {
    iAmOwner : undefined,
    iAmClient : undefined,
    company : undefined,
    establishment: undefined,
    owners: [],
    admin: false,
    adminOwners: false,
    adminClients: false,
    deleteOwner: false,
    ownerToDelete: undefined,
    mail: undefined,
    name: undefined,
    description: undefined,
    address: undefined,
    percentOfPeopleAllowed: undefined,
    maximumCapacity: undefined,
    startHourShift: undefined,
    finalHourShift: undefined,
    timeAllowedPerBooking: undefined,
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleAdminButton = () => {
    this.setState({
      admin: !this.state.admin,
    });
    this.getEstablishment()
  }

  clearDeleteOwner = () => {
    this.setState({
      deleteOwner: false,
      ownerToDelete: undefined,
    });
    this.getEstablishment()
  }

  handleDeleteOwner = (ownerId) => {
    this.setState({
      deleteOwner: !this.state.deleteOwner,
      ownerToDelete: ownerId,
    });
  }

  handleAdminOwnersButton = () => {
    this.setState({
      adminOwners: !this.state.adminOwners,
      // [e.target.name]: e.target.value, hacer que este metodo sirva para todos los true/false.
    });
    this.getEstablishment()
  }

  handleAdminClientsButton = () => {
    this.setState({
      adminClients: !this.state.adminClients,
      // [e.target.name]: e.target.value, hacer que este metodo sirva para todos los true/false.
    });
    this.getEstablishment()
  }

  showEstablishment(){
    const { establishment, owners, admin, adminOwners, iAmOwner, iAmClient, deleteOwner, ownerToDelete, adminClients } = this.state;
    return (
      <div key={establishment._id} className="info-establishment">
        <h1>{establishment.name}</h1>
          <h5>{establishment.description}</h5>
          <h3>Company:<Link to={`/company/${establishment.company._id}`}>{establishment.company.name}</Link></h3>
          {iAmOwner && 
            <div>
              <button onClick={this.handleAdminButton}>Admin establishment</button>
              <button style={{color:"red"}} 
                      // onClick={()=>{this.deleteEstablishment(establishment._id)}}
                      onClick={e =>
                      window.confirm("Are you sure you wish to delete this establishment? All associated clients and owners and their bookings will be deleted.") &&
                      this.deleteEstablishment(establishment._id)
                      }
              >Delete establishment</button><br/><br/>
              {admin && 
                <AdminEstablishment establishment={establishment} refresh={this.handleAdminButton} />
              }
            </div>
          }
          {!admin && 
            <div>
              <u className="title-section">Timetable:</u>
              <ul>
                <li className="timetable">Start hour: {establishment.timetable.startHourShift}</li>
                <li className="timetable">Final hour: {establishment.timetable.finalHourShift}</li>
                <li className="timetable">Time allowed per booking: {establishment.timetable.timeAllowedPerBooking}mins</li>
                <li className="timetable">How often can book per day: {establishment.timetable.howOftenCanBookPerDay}times</li>
              </ul>
              <p><u className="title-section">Capacity: {establishment.capacity.maximumCapacity} persons</u></p>

              {iAmOwner &&
                <div>
                  <u className="title-section">Do you wanna booking?</u><br/>
                  <CreateBooking establishment={establishment} /><br/>
                </div>
              }
              {iAmClient &&
                <div>
                  <u className="title-section">Do you wanna booking?</u><br/>
                  <CreateBooking establishment={establishment} /><br/>
                </div>
              }

              {/* <Calendar handleDate={this.handleDate} idEstablishment={establishment._id} /> */}
              {/* <img className="img-of-establishment" src={establishment.image_url} alt={establishment.name} /> */}

              <div className="title-section-inline">
              <u>Created by:</u>
              {iAmOwner && <button className="btn-admin" onClick={this.handleAdminOwnersButton}>Admin owners</button>}
              </div>
              {iAmOwner && adminOwners && 
                <ManageUsersOfEstablishment establishment={establishment} refresh={this.handleAdminOwnersButton} addNewOwner="True" />
              }

              {owners && 
                <ul className="list-owners">
                  {establishment.owners.map((owner)=>{
                    return (
                      <li key={owner._id}>
                        {deleteOwner && ownerToDelete === owner._id &&
                          <ManageUsersOfEstablishment establishment={establishment} refresh={this.clearDeleteOwner} deleteOwner={"True"} owner={owner} />
                          /* <ManageUsersOfCompany company={company} refresh={this.clearDeleteOwner} deleteOwner={"True"} owner={owner} /> */
                        }
                        <Link to={`/user/${owner._id}`}>{owner.name}</Link>
                        {iAmOwner && adminOwners && <button className="btn-delete-user" 
                        // onClick={this.handleDeleteOwner}>Delete owner</button>}
                        onClick={e =>
                        window.confirm("Are you sure you wish to delete this owner? All reservations made at this establishment will be lost") &&
                        this.handleDeleteOwner(owner._id)
                        }>  Delete owner</button>}
                        {/* {iAmOwner && adminOwners && deleteOwner && //tema asincronía?
                            <ManageUsersOfEstablishment establishment={establishment} refresh={this.handleDeleteOwner} deleteOwner={"True"} owner={owner} />
                        } */}
                      </li>
                    )
                  })}
                </ul>
              }
              {iAmOwner && 
                <div className="title-section-inline">
                  <u>Clients:</u>
                  <button className="btn-admin" onClick={this.handleAdminClientsButton}>Admin clients</button>
                </div>
              }
              {adminClients && iAmOwner && 
                <ManageUsersOfEstablishment establishment={establishment} refresh={this.handleAdminClientsButton} addNewClient="True" />
              }
              {iAmOwner && 
                <ul>
                {establishment.clients.map((client, index)=>{
                  return(
                    <li key={client._id} className="list-clients">
                      <Link to={`/user/${establishment.clients[index]._id}`}>{client.name}</Link>
                      {/* <div>
                        <button onClick={this.handleDeleteclient}>Delete client</button>
                        {deleteOwner &&
                          <ManageUsersOfCompany company={company} refresh={this.handleDeleteOwner} deleteOwner={"True"} owner={owner} />
                        }
                      </div> */}
                    </li>
                  ) 
                }
                )}
              </ul>
              }
              </div>
            }
      </div>
    )
  }
  

  deleteEstablishment(idEstablishment){
    const { history } = this.props;
    apiEstablishment
    .deleteEstablishment(idEstablishment)
    .then(({ data: company }) => {
      history.push(`/establishment/`);
    })
    .catch((error) => {
      console.log(error)
    });
  }
  
  iAmOwner(){
    const { establishment } = this.state;
    const { user } = this.props;
    let iAmOwner = false;
    establishment.owners.map((owner, index) => {
      if(owner._id === user._id) {
        iAmOwner = true;
      }
      return null
    })
    if(iAmOwner){
      this.setState({
        iAmOwner
      })
    }
  }

  iAmClient(){
    const { establishment } = this.state;
    const { user } = this.props;
    let iAmClient = false;
    establishment.clients.map((client, index) => {
      if(client._id === user._id) {
        iAmClient = true;
      }
      return null
    })
    if(iAmClient){
      this.setState({
        iAmClient
      })
    }
  }

  getEstablishment(){
    const establishmentID = this.props.match.params.id;
    apiEstablishment
    .getEstablishment(establishmentID)
    .then(({ data:establishment }) => {
      this.setState({
        establishment
      })
      this.iAmOwner()
      this.iAmClient()
    })
    .catch((error) => {
      console.log(error)
    });
  }

  componentDidMount(){
    this.getEstablishment()
  }

  render() {
    const { establishment } = this.state;
    return (
      <div>
        {!establishment && 
        <p>Loading</p>
        }
        {establishment && this.showEstablishment() }      
        </div>
    );
  }
}

export default withAuth(Establishment);