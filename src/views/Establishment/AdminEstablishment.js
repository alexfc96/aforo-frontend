import React, { Component } from "react";

import { withAuth } from "../../context/authContext";
import apiEstablishment from "../../services/apiEstablishment";

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
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  adminEstablishment(){
    const { name, description, percentOfPeopleAllowed, maximumCapacity, address, startHourShift, finalHourShift, timeAllowedPerBooking } = this.state;
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
    const { refresh, establishment } = this.props;
    const { name, description, percentOfPeopleAllowed, maximumCapacity, address, startHourShift, finalHourShift, timeAllowedPerBooking } = this.state;
    const establishmentObj = { name, description, capacity:{percentOfPeopleAllowed, maximumCapacity}, address, timetable:{startHourShift, finalHourShift, timeAllowedPerBooking} }
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
