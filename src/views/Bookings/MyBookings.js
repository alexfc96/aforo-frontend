import React, { Component } from "react";
import { withAuth } from "../../context/authContext";
import { Link } from "react-router-dom";
import Moment from 'react-moment';

import apiCompany from "../../services/apiCompany";
import apiBookings from "../../services/apiBookings";
// import apiEstablishment from "../../services/apiEstablishment";

class MyBookings extends Component {
  state = {
    companies : undefined,
    bookings: undefined,
    oldBookings: undefined,
    establishments: [],
  }

  //esto demomento está parao.
  async getNameCompany(establishment){//tiene que recibir el objeto completo de establishment o el id de la company
    // console.log('Enntro en nameEstabli',establishment)
    try {
      const nameCompany = await apiCompany.getCompany(establishment.company)
      console.log('El name de la company ',nameCompany.data.name)
      return nameCompany.data.name  //espera setState para que se pueda pintar en la pantalla? pero entonces pierdo el hilo del map
    } catch (error) {
      console.log(error)
    }
  }

  checkEstablishment(establishment){
    console.log("el establishemnte que recibo",establishment);
    const { establishments } = this.state;
    let estabExists = false;
    establishments.map((estab) =>{
      if(estab.name === establishment.name){
        estabExists = true;
      }
    if(estabExists){
        this.setState({
          establishments: [...establishments, establishment]
        })
    }
    })

  }

  showOldBookings(){
    const { companies, establishments, oldBookings } = this.state;
    return(
      <div>
        <h4>Your past bookings:</h4>
        <ul className="showBooking">
          {oldBookings.map((booking)=>{
            {/* console.log("booking", booking) */}
            {/* console.log("una booking", booking)
            this.checkEstablishment(booking.idEstablishment);
            const { establishments } = this.state;
            console.log("Los estbalishments que tenemos en state es:", establishments) */}
            //this.getCompany(booking.idEstablishment) //tendremos que buscar la company apartir del establishment
            return <li key={booking._id}>
                    <div>
                      <Link to={`/establishment/${booking.idEstablishment._id}`}>{booking.idEstablishment.name}</Link>
                    </div>
                    {/* {this.getEstablishment(booking.idEstablishment)} */}
                    <h3>Day:<Moment format='LL' date={booking.day} /></h3>
                    <h3>Start hour:{booking.startHour}</h3>
                    {/* <h3>Duration:{booking.duration} mins</h3> */}
                    <hr/>
                  </li>
          })
        }
        </ul>
      </div>
    )
  }


  showBookings(){
    const { companies, establishments, bookings } = this.state;
    return(
      <div>
        <ul className="showBooking">
          {bookings.map((booking)=>{
            {/* console.log("booking", booking) */}
            {/* console.log("una booking", booking)
            this.checkEstablishment(booking.idEstablishment);
            const { establishments } = this.state;
            console.log("Los estbalishments que tenemos en state es:", establishments) */}
            //this.getCompany(booking.idEstablishment) //tendremos que buscar la company apartir del establishment
            return <li key={booking._id}>
                    <div>
                      <Link to={`/establishment/${booking.idEstablishment._id}`}>{booking.idEstablishment.name}</Link>
                      <button onClick={()=>{this.deleteBooking(booking._id, booking.idEstablishment)}}>Delete Booking</button>
                    </div>
                    {/* {this.getEstablishment(booking.idEstablishment)} */}
                    <h3>Day:<Moment format='LL' date={booking.day} /></h3>
                    <h3>Start hour:{booking.startHour}</h3>
                    {/* <h3>Duration:{booking.duration} mins</h3> */}
                    <hr/>
                  </li>
          })
        }
        </ul>
      </div>
    )
  }

  deleteBooking = (idBooking, idEstablishment) => {
    apiBookings
    .deleteBooking(idEstablishment, idBooking)
    .then(() => {
      this.getBookings()
    })
    .catch((error) => {
      console.log(error)
    });
  }

  getBookings(){
    apiBookings
    .bookings()
    .then(({ data:bookings }) => {
      // console.log('bookings',bookings)
      this.setState({
        bookings
      });
    })
    .catch((error) => {
      console.log(error)
      this.setState({
        companies: false,
        bookings: false,
      });
    });
  }

  getOldBookings(){
    apiBookings
    .oldBookings()
    .then(({ data:oldBookings }) => {
      // console.log('bookings',bookings)
      this.setState({
        oldBookings
      });
    })
    .catch((error) => {
      console.log(error)
      this.setState({
        // companies: false,
        oldBookings: false,
      });
    });
  }

  componentDidMount(){
    this.getBookings()
    this.getOldBookings()
  }

  render() {
    // const { user } = this.props;
    const { companies, establishments, bookings, oldBookings } = this.state;
    return (
      <div>
        <h1>My current bookings</h1>
        {bookings && bookings.length === 0 &&
          <p> It seems that you dont any booking scheduled</p>
        }
        {bookings && this.showBookings() }
        {oldBookings && this.showOldBookings() }

      </div>
    );
  }
}

export default withAuth(MyBookings);