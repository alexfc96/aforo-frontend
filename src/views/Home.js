import React, { Component } from "react";
import DayPicker from 'react-day-picker';
//http://react-day-picker.js.org/examples/selected

import 'react-day-picker/lib/style.css';
import apiBookings from "../services/apiBookings";


import { withAuth } from "../context/authContext";

class Home extends Component {

  state = {
    bookings: undefined,
	};

  getBookings(){
    apiBookings
    .allBookings()
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

  componentDidMount(){
    this.getBookings()
  }

  render() {
    const { user } = this.props;
    const { bookings } = this.state;
    console.log(user)
    return (
      <div>
        <h1 style={{textAlign:"left", marginLeft:"5%"}}>Welcome {user.name}</h1><br/>

        <h2>Your next bookings:</h2>
        {bookings && 
          <DayPicker selectedDays={bookings.map((booking)=>{
            return new Date(booking.day)
          }
          )} />
        }
        
      </div>
    );
  }
}

export default withAuth(Home);
