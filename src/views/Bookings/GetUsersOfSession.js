import React, { Component } from "react";

import apiBookings from "../../services/apiBookings";
import { Link } from "react-router-dom";

class GetUsersOfSession extends Component {

  state={
    bookings: undefined
  }

  componentDidMount(){
    const establishmentID = this.props.match.params.id;
    const session = this.props.match.params.session;
    const day = this.props.match.params.day;
    const objSession = { day, session }
    apiBookings
    .bookingsBySession(establishmentID, objSession)
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

  render() {
    const { bookings } = this.state;
    const session = this.props.match.params.session;
    return (
      <div>
        <h3>Users at {session}:</h3>

        <ul style={{display:"flex", flexDirection:"column"}}>
        {bookings && 
        bookings.map((booking)=>{
          return (
            <li key={booking._id}>
              <Link to={`/user/${booking.idUser._id}` }>{booking.idUser.name}</Link>
            </li>
          )
        })
        }
        </ul>
      </div>
    );
  }
}

export default GetUsersOfSession;