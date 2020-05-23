import React, { Component } from "react";

import { withAuth } from "../../context/authContext";
import apiEstablishment from "../../services/apiEstablishment";
import apiBookings from "../../services/apiBookings";

class CreateBooking extends Component {

  state = {
    day: undefined,
    startHour: 0,
    duration: 0
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleNewBooking = (e) => {
    e.preventDefault()
    const { day, startHour, duration } = this.state;
    const { establishment } = this.props;
    console.log("datos para realizar la booking:",this.state);
    const bookingObj = { day, startHour, duration };
    const { history } = this.props;
    apiBookings
      .newBooking(establishment._id, bookingObj)
      .then(({ data:booking }) => {
        history.push(`/bookings/`);
        this.forceUpdate()
      })
      .catch((error)=> {
        console.log(error)
      })
  }

  render(){
    const { establishment } = this.props;
    return(
      <div>
        <form onSubmit={this.handleNewBooking}>
          <label htmlFor="day">Day</label>
          <input
            type="date"
            name="day"
            id="day"
            require
            onChange={this.handleChange}
          />
          <label htmlFor="startHour">startHour</label>
          <input
            type="time"
            name="startHour"
            id="startHour"
            min={establishment.timetable.startHourShift}
            max={establishment.timetable.finalHourShift}
            require
            onChange={this.handleChange}
          />
          <label htmlFor="duration">duration</label>
          <input
            type="number"
            name="duration"
            id="duration"
            placeholder="Specify in minutes"
            pattern="[0-9]{2}"
            minlength="2" 
            maxlength="3"
            min="10" 
            max={establishment.timetable.timeAllowedPerBooking}
            require
            onChange={this.handleChange}
          />
          <input type="submit" value="submit" />
        </form>
      </div>
    )
  }
}

export default withAuth(CreateBooking);
