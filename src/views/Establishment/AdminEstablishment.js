import React, { Component } from "react";

import { withAuth } from "../../context/authContext";
import apiEstablishment from "../../services/apiEstablishment";

import '../../App.css'
import './establishment.css'

class AdminEstablishment extends Component {

  state = {
    name: undefined,
    description: undefined,
    address: undefined,
    percentOfPeopleAllowed: undefined,
    maximumCapacity: undefined,
    startHourShift: undefined,
    finalHourShift: undefined,
    timeAllowedPerBooking: undefined,
    howOftenCanBookPerDay: undefined
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  adminEstablishment(){
    const { name, description, percentOfPeopleAllowed, maximumCapacity, address, startHourShift, finalHourShift, timeAllowedPerBooking, howOftenCanBookPerDay } = this.state;
    return (
      <form onSubmit={this.handleSubmitForm}>
      <p>
      <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={this.handleChange}
        />
      </p>
      <p>
      <label htmlFor="description">Description:</label>
        <textarea
          type="text"
          name="description"
          id="description"
          cols={20} rows={3}
          value={description}
          onChange={this.handleChange}
        />
      </p>
      <p>
      <label htmlFor="address">Address:</label>
        <input
          type="text"
          name="address"
          id="address"
          value={address}
          onChange={this.handleChange}
        />
      </p>

      <p className="title-section"><u>Capacity:</u></p>
      <p>
      <label htmlFor="maximumCapacity">Maximum capacity:</label>
        <input
          type="number"
          className="numbers"
          name="maximumCapacity"
          id="maximumCapacity"
          value={maximumCapacity}
          onChange={this.handleChange}
        />
      </p>
      <p>
      <label htmlFor="percentOfPeopleAllowed">Percent of people allowed:</label>
        <input
          type="number"
          className="numbers"
          name="percentOfPeopleAllowed"
          id="percentOfPeopleAllowed"
          value={percentOfPeopleAllowed}
          onChange={this.handleChange}
        />%
      </p>
      <p className="title-section"><u>Timetable:</u></p>
      <p>
      <label htmlFor="startHourShift">Start hour shift:</label>
        <input
          type="time"
          name="startHourShift"
          id="tartHourShift"
          value={startHourShift}
          onChange={this.handleChange}
        />
      </p>
      <p>
      <label htmlFor="finalHourShift">Final hour shift:</label>
        <input
          type="time"
          name="finalHourShift"
          id="finalHourShift"
          value={finalHourShift}
          onChange={this.handleChange}
        />
      </p>
      <p>
      <label htmlFor="timeAllowedPerBooking">Time allowed per booking:</label>
        <input
          type="number"
          className="numbers"
          min="5" max="1440"
          name="timeAllowedPerBooking"
          id="timeAllowedPerBooking"
          value={timeAllowedPerBooking}
          onChange={this.handleChange}
        />mins
      </p>
      <p>
      <label htmlFor="howOftenCanBookPerDay">How often can book per day:</label>
        <input
          type="number"
          className="numbers"
          name="howOftenCanBookPerDay"
          id="howOftenCanBookPerDay"
          required
          value={howOftenCanBookPerDay}
          onChange={this.handleChange}
        /> times
      </p>

      <input type="submit" value="Update" className="btn-create-2" />
    </form>
    )
  }

  handleSubmitForm = (e) => {
    e.preventDefault();
    const { refresh, establishment } = this.props;
    const { name, description, percentOfPeopleAllowed, maximumCapacity, address, startHourShift, finalHourShift, timeAllowedPerBooking, howOftenCanBookPerDay } = this.state;
    const establishmentObj = { name, description, capacity:{percentOfPeopleAllowed, maximumCapacity}, address, timetable:{startHourShift, finalHourShift, timeAllowedPerBooking, howOftenCanBookPerDay } }
    apiEstablishment
    .updateEstablishment(establishment._id, establishmentObj)
    .then(({ data:establishment }) => {
      refresh()
    })
    .catch((error) => {
      console.log(error)
    });
  };

  componentDidMount(){
    const { establishment } = this.props;
    this.setState({
      name: establishment.name,
      description: establishment.description,
      address: establishment.address,
      percentOfPeopleAllowed: establishment.capacity.percentOfPeopleAllowed,
      maximumCapacity: establishment.capacity.maximumCapacity,
      startHourShift: establishment.timetable.startHourShift,
      finalHourShift: establishment.timetable.finalHourShift,
      timeAllowedPerBooking: establishment.timetable.timeAllowedPerBooking,
      howOftenCanBookPerDay: establishment.timetable.howOftenCanBookPerDay,
    })
  }

  render(){
    const { name } = this.state;
    return(
      <div>
        {name && this.adminEstablishment()}
      </div>
    )
  }
}

export default withAuth(AdminEstablishment);
