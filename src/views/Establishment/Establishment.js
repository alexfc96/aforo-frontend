import React, { Component } from "react";

import { withAuth } from "../../context/authContext";
import apiEstablishment from "../../services/apiEstablishment";
import { Link } from "react-router-dom";
// import Calendar from "../../components/Calendar";
// import apiBookings from "../../services/apiBookings";
import CreateBooking from "../Bookings/CreateBooking";
import AdminEstablishment from "./AdminEstablishment";
import ManageUsersOfEstablishment from "./ManageUsersOfEstablishment";

class Establishment extends Component {

  state = {
    iAmOwner : false,
    company : undefined,
    establishment: undefined,
    owners: [],
    admin: false,
    adminOwners: false,
    adminClients: false,
    deleteOwner: false,
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

  handleDeleteOwner = () => {
    this.setState({
      deleteOwner: !this.state.deleteOwner,
    });
    this.getEstablishment()
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
    const { user } = this.props;
    const { establishment, owners, admin, adminOwners, iAmOwner, deleteOwner, adminClients } = this.state;
    let owner = undefined;
    return (
      <div key={establishment._id} className="info-establishment">
        {establishment.owners.includes(user._id) ? owner = true : owner = false}
        <h1>{establishment.name}</h1>
          <h5>{establishment.description}</h5>
          <h2>Company:<Link to={`/company/${establishment.company._id}` }><h3>{establishment.company.name}</h3></Link></h2> 
          {iAmOwner && 
            <div>
              <button onClick={this.handleAdminButton}>Admin establishment</button>
              <button onClick={()=>{this.deleteEstablishment(establishment._id)}}>Delete establishment</button>
              {admin && 
                <AdminEstablishment establishment={establishment} refresh={this.handleAdminButton} />
              }
            </div>
          }
          {!admin && 
            <div>
              Do you wanna booking?
              <CreateBooking establishment={establishment} />
              {/* <Calendar handleDate={this.handleDate} idEstablishment={establishment._id} /> */}
              {/* <img className="img-of-establishment" src={establishment.image_url} alt={establishment.name} /> */}
              Timetable:
              <ul>
                <li>Start hour: {establishment.timetable.startHourShift}</li>
                <li>Final hour: {establishment.timetable.finalHourShift}</li>
                <li>Time allowed per booking: {establishment.timetable.timeAllowedPerBooking}mins</li>
              </ul>
              <p>Capacity: {establishment.capacity.maximumCapacity}</p>
              Created by :
              {iAmOwner && 
                <div>
                  <button onClick={this.handleAdminOwnersButton}>Admin owners of establishment</button>
                  {adminOwners && 
                    <ManageUsersOfEstablishment establishment={establishment} refresh={this.handleAdminOwnersButton} addNewOwner="True" />
                  }
                </div>

              }
              {owners && 
                <ul>
                  {establishment.owners.map((owner, index)=>{
                    return <li key={owner._id}>
                            <Link to={`/user/${owner._id}`}><h3>{owner.name}</h3></Link>
                            {iAmOwner && adminOwners &&
                              <div>
                                <button onClick={this.handleDeleteOwner}>Delete owner</button>
                                {deleteOwner && //tema asincronía?
                                  <ManageUsersOfEstablishment establishment={establishment} refresh={this.handleDeleteOwner} deleteOwner={"True"} owner={owner} />
                                }
                              </div>
                            }
                          </li>
                  })}
                </ul>
              }
              {iAmOwner && 
              <div>
                Clients:
                <div>
                  <button onClick={this.handleAdminClientsButton}>Admin clients of establishment</button>
                  {adminClients && 
                    <ManageUsersOfEstablishment establishment={establishment} refresh={this.handleAdminClientsButton} addNewClient="True" />
                  }
                </div>
                <ul>
                  {establishment.clients.map((client, index)=>{
                    return(
                      <li key={client._id}>
                        <Link to={`/user/${establishment.clients[index]._id}`}><h3>{client.name}</h3></Link>
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
              </div>
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
    this.setState({
      iAmOwner : true
    })
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
    })
    .catch((error) => {
      console.log(error)
    });
  }

  componentDidMount(){
    this.getEstablishment()
  }

  render() {
    const { establishment, adminOwners } = this.state;
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