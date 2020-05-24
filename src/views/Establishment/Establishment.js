import React, { Component } from "react";

import { withAuth } from "../../context/authContext";
import apiUser from "../../services/apiUser";
import apiEstablishment from "../../services/apiEstablishment";
import { Link } from "react-router-dom";
import Calendar from "../../components/Calendar";
import apiBookings from "../../services/apiBookings";
import CreateBooking from "../Bookings/CreateBooking";

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
    const { establishment } = this.state
    this.setState({
      admin: !this.state.admin,
      name: establishment.name,
      description: establishment.description,
      percentOfPeopleAllowed: establishment.capacity.percentOfPeopleAllowed,
      maximumCapacity: establishment.capacity.maximumCapacity,
      address: establishment.address,
      startHourShift: establishment.timetable.startHourShift,
      finalHourShift: establishment.timetable.finalHourShift,
      timeAllowedPerBooking: establishment.timetable.timeAllowedPerBooking
    });
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

  //la paso al component createBoking
  // handleNewBooking = (e) => {
  //   e.preventDefault()
  //   console.log("datos para realizar la booking:",dataBooking);
  //   // const { establishment } = this.state; //he perdido la referencia
  //   // const { history } = this.props; //esto parece que tampoco lo tengo
  //   // apiBookings
  //   //   .newBooking(idEstablishment, date)
  //   //   .then(({ data:booking }) => {
  //   //     // history.push(`/bookings/`);
  //   //     this.forceUpdate()
  //   //   })
  //   //   .catch((error)=> {
  //   //     console.log(error)
  //   //   })
  // }

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

  adminEstablishment(){
    const { name, description, percentOfPeopleAllowed, maximumCapacity, address, startHourShift, finalHourShift, timeAllowedPerBooking } = this.state;
    console.log('startHouur',startHourShift)
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
      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        id="description"
        value={description}
        onChange={this.handleChange}
      />
      <label htmlFor="address">address</label>
      <input
        type="text"
        name="address"
        id="address"
        value={address}
        onChange={this.handleChange}
      />
      Capacity:
      <label htmlFor="maximumCapacity">maximumCapacity</label>
      <input
        type="number"
        name="maximumCapacity"
        id="maximumCapacity"
        value={maximumCapacity}
        onChange={this.handleChange}
      />
      <label htmlFor="percentOfPeopleAllowed">percentOfPeopleAllowed</label>
      <input
        type="number"
        name="percentOfPeopleAllowed"
        id="percentOfPeopleAllowed"
        value={percentOfPeopleAllowed}
        onChange={this.handleChange}
      />
      Timetable:
      <label htmlFor="startHourShift">startHourShift</label>
      <input
        type="time"
        name="startHourShift"
        id="tartHourShift"
        value={startHourShift}
        onChange={this.handleChange}
      />
      <label htmlFor="finalHourShift">finalHourShift</label>
      <input
        type="time"
        name="finalHourShift"
        id="finalHourShift"
        value={finalHourShift}
        onChange={this.handleChange}
      />
      <label htmlFor="timeAllowedPerBooking">timeAllowedPerBooking</label>
      <input
        type="number"
        name="timeAllowedPerBooking"
        id="timeAllowedPerBooking"
        value={timeAllowedPerBooking}
        onChange={this.handleChange}
      />
      <input type="submit" value="submit" />
    </form>
    )
  }

  handleSubmitForm = (e) => {
    e.preventDefault();
    const { establishment, name, description, percentOfPeopleAllowed, maximumCapacity, address, startHourShift, finalHourShift, timeAllowedPerBooking } = this.state;
    const establishmentObj = { name, description, capacity:{percentOfPeopleAllowed, maximumCapacity}, address, timetable:{startHourShift, finalHourShift, timeAllowedPerBooking} }
    //const establishmentObj = this.checkIfInputIsEmpty() //conseguir asincronía!!
    console.log(establishmentObj)
    apiEstablishment
    .updateEstablishment(establishment._id, establishmentObj)
    .then(({ data:establishment }) => {
      this.handleAdminButton()
      this.getEstablishment()
    })
    .catch((error) => {
      console.log(error)
    });
  };

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
    const { user } = this.props;
    const { establishment, owners, admin, adminOwners, iAmOwner } = this.state;
    let owner = undefined;
    return (
      <div>
        {!establishment && 
        <p>Loading</p>
        }
        {establishment &&
          <div key={establishment._id} className="info-establishment">
            {establishment.owners.includes(user._id) ? owner = true : owner = false}
            <h1>{establishment.name}</h1>
              <h2>Company:<Link to={`/company/${establishment.company._id}` }><h3>{establishment.company.name}</h3></Link></h2> 
              {iAmOwner && 
                <div>
                  <button onClick={()=>{this.handleAdminButton(establishment._id)}}>Admin establishment</button>
                  <button onClick={()=>{this.deleteEstablishment(establishment._id)}}>Delete establishment</button>
                  <button onClick={()=>{this.handleAdminOwnersButton(establishment._id)}}>Admin owners of establishment</button>
                  {admin && 
                    this.adminEstablishment()
                  }
                </div>
              }
              Do you wanna booking?
              <CreateBooking establishment={establishment} />
              {/* <Calendar handleDate={this.handleDate} idEstablishment={establishment._id} /> */}
              {/* <img className="img-of-establishment" src={establishment.image_url} alt={establishment.name} /> */}
              {!admin && 
                <div>
                  <h5>{establishment.description}</h5>
                  Timetable:
                  <ul>
                    <li>Start hour: {establishment.timetable.startHourShift}</li>
                    <li>Final hour: {establishment.timetable.finalHourShift}</li>
                    <li>Time allowed per booking: {establishment.timetable.timeAllowedPerBooking}mins</li>
                  </ul>
                  <p>Capacity: {establishment.capacity.maximumCapacity}</p>
                  Created by :
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
        }      
        </div>
    );
  }
}

export default withAuth(Establishment);