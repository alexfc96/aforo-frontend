import React, { Component } from "react";
import { withRouter, Link } from 'react-router-dom'

import { withAuth } from "../../context/authContext";
import apiBookings from "../../services/apiBookings";

import './bookings.css'
import '../../App.css'

class CreateBooking extends Component {

  state = {
    day: undefined,
    startHour: 0,
    // duration: 0,
    sessions: false,
    bookingsInOneDay: undefined,
    arrayOfSessions: undefined,
    error: undefined
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleBookingsInOneDay = (e) => {
    e.preventDefault()
    const { day } = this.state;
    const tempDate = new Date(day);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if(tempDate>=yesterday){
      const { establishment } = this.props;
      const bookingObj = { day };
      apiBookings
        .bookingsByDay(establishment._id, bookingObj)
        .then(({ data:bookingsInOneDay }) => {
          // console.log(bookingsInOneDay)
          this.setState({
            bookingsInOneDay,
            error: undefined,
          })
        })
        .catch((error)=> {
          console.log(error)
        })
    } else{
      this.setState({
        bookingsInOneDay: undefined,
        error: "Please indicates date higher than yesterday. "
      })
      return <div>Selecciona una fecha superior a HOY!</div>
    }
    
  }

  handleHour(startHour){
    console.log("session selecionada",startHour)
    this.setState({
      startHour
    })
  }

  createBooking = (e) =>{
    e.preventDefault()
    const { day, startHour, error } = this.state;
    if(startHour && !error){
      const { establishment, history } = this.props;
      const bookingObj = { day, startHour };
      apiBookings
        .newBooking(establishment._id, bookingObj)
        .then(({ data:booking }) => {
          history.push(`/bookings/`);
        })
        .catch((error)=> {
          console.log(error)
        })
    }
  }

  searchSessions(){
    const { establishment } = this.props;
    let timeAllowedPerBooking = parseInt(establishment.timetable.timeAllowedPerBooking) //pasamos a timeAllowed a number
    const hourMinutesStrs = establishment.timetable.startHourShift;
    let startHourShift = parseInt(establishment.timetable.startHourShift);
    let finalHourShift = parseInt(establishment.timetable.finalHourShift);

    const arrayOfSessions = [];
    const temp = hourMinutesStrs.split(':');
    let countHours = parseInt(temp[0]) //first hour
    let countMinutes = parseInt(temp[1])
    const saveMinutes = countMinutes;

    let hoursStr = undefined;
    let minsStr = undefined;

    while (countHours < finalHourShift) {  //sacamos las horas o timeSessions en las que se van a poder reservar.
      countMinutes = countMinutes + timeAllowedPerBooking;
      if(countMinutes<60){
        hoursStr = countHours.toString();
        if(hoursStr<=9){
          hoursStr = "0"+hoursStr;
        }
        minsStr = countMinutes.toString();
        let finalTime = hoursStr.concat(':', minsStr);
        arrayOfSessions.push(finalTime)  //tendremos que hacer un join de las horas y los minutos para que sean una unidad y no 2.
      } else{
        countHours = countHours + 1;
        countMinutes = countMinutes-60;
        hoursStr = countHours.toString();
        if(hoursStr<10){
          hoursStr = "0"+hoursStr;
        }
        minsStr = countMinutes.toString();
        if(minsStr<=9){
          minsStr = minsStr+"0";
        }
        let finalTime = hoursStr.concat(':', minsStr);
        arrayOfSessions.push(finalTime);
      }
    }
    hoursStr = startHourShift.toString();
    if(hoursStr<=9){
      hoursStr = "0"+hoursStr;
    }
    minsStr = saveMinutes.toString();
    if(minsStr<=9){
      minsStr = minsStr+"0";
    }
    let finalTime = hoursStr.concat(':', minsStr);
    arrayOfSessions.unshift(finalTime);//en este caso agregamos ya la primera sesion
    arrayOfSessions.pop();//eliminamos la ultima hora ya que no me insteresa que puedan reservar a esa hora
    // console.log(arrayOfSessions) //horas de inciios de sesion
    this.setState({
      sessions: true,
      arrayOfSessions
    })
    // this.printSessions(arrayOfSessions)
  }

  printSessions(){
    const { bookingsInOneDay, arrayOfSessions } = this.state;
    const { establishment, iAmOwner } = this.props;
    const { maximumCapacity, percentOfPeopleAllowed } = establishment.capacity;
    const percentOfUsersAllowedInTheEstablishmentInCertainTime = Math.round(  //sacamos el numero total de usuarios que se van a permitir por sesión.
      (maximumCapacity * percentOfPeopleAllowed) / 100,
    );
    let cont = 0;
    return(
      <div className="show-sessions">
        {arrayOfSessions.map((session)=>{
          cont=0;
          bookingsInOneDay.map((booking)=>{
            if(booking.startHour===session){
              cont=cont+1
            }
            return null
          })
          return (
            <div key={session} className="show-session" >
              {cont >= percentOfUsersAllowedInTheEstablishmentInCertainTime &&
                <div>{session}</div>
              }
              {cont < percentOfUsersAllowedInTheEstablishmentInCertainTime && 
                <button onClick={()=>{this.handleHour(session)}} className="btn-session">{session}</button>
              }
              {iAmOwner && cont>0 &&
                <Link to={`/establishment/${establishment._id}/bookings-in-one-session/${session}`}> Reserved sessions: {cont}/{percentOfUsersAllowedInTheEstablishmentInCertainTime}</Link>
              }
              {iAmOwner && cont===0 &&
                <div style={{display:"flex"}}>
                Reserved sessions: {cont}/{percentOfUsersAllowedInTheEstablishmentInCertainTime}
                </div>
              }
              {!iAmOwner &&
                <div style={{display:"flex"}}>
                  Reserved session: {cont}/{percentOfUsersAllowedInTheEstablishmentInCertainTime}
                </div>
              }
            </div>
          ) 
        })}
      </div>
    )
  }

  render(){
    const { bookingsInOneDay, arrayOfSessions, sessions, error } = this.state;
    return(
      <div>
        <form onSubmit={this.handleBookingsInOneDay}>
          <label htmlFor="day">Select the day</label>
          <input
            type="date"
            name="day"
            id="day"
            required
            onChange={this.handleChange}
          />
          <input type="submit" value="Select" className="btn-create-2" />
        </form><br/>
        {error}
        {bookingsInOneDay &&
          <div>
            Available hours:
            {!sessions && this.searchSessions()}
            {arrayOfSessions && this.printSessions()}

            {/* las bookings ya realizadas en ese dia: esto solamente es para mostrar que los datos son reales! las boookings
            {bookingsInOneDay.map((booking)=>{
            return <p key={booking._id}>{booking.startHour}</p>
            })
            } */}
            <button onClick={this.createBooking}>Create booking</button>
          </div>

        }
      </div>

    )
  }
}

export default withRouter(withAuth(CreateBooking));
