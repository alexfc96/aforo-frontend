import React, { Component } from "react";
import { withAuth } from "../../context/authContext";
import { Link } from "react-router-dom";
import Moment from 'react-moment';

import apiBookings from "../../services/apiBookings";

class MyBookings extends Component {
  state = {
    bookings: undefined,
    oldBookings: undefined,
  }

  showOldBookings(){
    const { oldBookings } = this.state;
    return(
      <div>
        <h4>Your past bookings:</h4>
        <ul className="showBooking">
          {oldBookings.map((booking)=>{
            
            return <li key={booking._id}>
                    <div>
                      <Link to={`/establishment/${booking.idEstablishment._id}`}>{booking.idEstablishment.name}</Link>
                    </div>
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
    const { bookings } = this.state;
    return(
      <div>
        <ul className="showBooking">
          {bookings.map((booking)=>{
            return <li key={booking._id}>
                    <div>
                      <Link to={`/establishment/${booking.idEstablishment._id}`}>{booking.idEstablishment.name}</Link>
                      <button onClick={()=>{this.deleteBooking(booking._id, booking.idEstablishment)}}>Delete Booking</button>
                    </div>
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
      this.setState({
        bookings
      });
    })
    .catch((error) => {
      console.log(error)
      this.setState({
        bookings: false,
      });
    });
  }

  getOldBookings(){
    apiBookings
    .oldBookings()
    .then(({ data:oldBookings }) => {
      this.setState({
        oldBookings
      });
    })
    .catch((error) => {
      console.log(error)
      this.setState({
        oldBookings: false,
      });
    });
  }

  componentDidMount(){
    this.getBookings()
    this.getOldBookings()
  }

  render() {
    const { bookings, oldBookings } = this.state;
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