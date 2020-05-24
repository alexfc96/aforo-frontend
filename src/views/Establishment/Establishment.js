import React, { Component } from "react";

import { withAuth } from "../../context/authContext";
import apiUser from "../../services/apiUser";
import apiEstablishment from "../../services/apiEstablishment";
import { Link } from "react-router-dom";
// import Calendar from "../../components/Calendar";
// import apiBookings from "../../services/apiBookings";
import CreateBooking from "../Bookings/CreateBooking";
import AdminEstablishment from "./AdminEstablishment";

class Establishment extends Component {

  state = {
    iAmOwner : false,
    company : undefined,
    establishment: undefined,
    owners: [],
    admin: false,
    adminOwners: false,
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

  handleAdminButton = () => {
    this.setState({
      admin: !this.state.admin,
    });
    this.getEstablishment()
  }

  handleAdminOwnersButton = () => {
    this.setState({
      adminOwners: !this.state.adminOwners,
      // [e.target.name]: e.target.value, hacer que este metodo sirva para todos los true/false.
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //no consigo enviarle el req.body el objeto mail para que lo procese el back. 
  async searchUserByMail(){
    const { mail } = this.state;
    console.log("mail:", mail)
    const getUserByMail = await apiUser.getUserByMail({
      // mail
      mail: "test@gmail.com"	
    })
    console.log("El user solicitado por email es", getUserByMail)
    return getUserByMail.data._id
    // apiUser
    // .getUserByMail({mail}) //comproBAR ESTO EN POOOOOOSTMAN
    // .then(({ data:user}) => {
    //   console.log("El user solicitado por email es", user)
    //   return user
    // })
    // .catch((error) => {
    //   console.log(error)
    // });
  }

  handleSubmitFormAddNewOwner = async(e) =>{
    e.preventDefault();
    const { mail, establishment } = this.state;
    const user = await this.searchUserByMail(); // de nuevo tema async
    apiEstablishment
    .joinOwner(establishment._id, user._id)
    .then(({ data:owner }) => {
      this.getEstablishment()
    })
    .catch((error) => {
      console.log(error)
    });
  }

  showEstablishment(){
    const { user } = this.props;
    const { establishment, owners, admin, adminOwners, iAmOwner } = this.state;
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
                  <button onClick={()=>{this.handleAdminOwnersButton(establishment._id)}}>Admin owners of establishment</button>
                  {adminOwners && 
                    <div>
                      <p>Add new Owner</p>
                      <form onSubmit={this.handleSubmitFormAddNewOwner}>
                        <label htmlFor="mail">Mail</label>
                        <input
                          type="mail"
                          name="mail"
                          id="mail"
                          onChange={this.handleChange}
                        />
                        <input type="submit" value="submit" />
                      </form>
                    </div>
                }
                </div>

              }
                {owners && 
                  <ul>
                    {establishment.owners.map((owner, index)=>{
                      return <li key={owner._id}>
                              <Link to={`/user/${owner._id}`}><h3>{owner.name}</h3></Link>
                            </li>
                    })}
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