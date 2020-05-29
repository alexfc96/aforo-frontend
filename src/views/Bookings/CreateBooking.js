import React, { Component } from "react";
import { withRouter } from 'react-router-dom'

import { withAuth } from "../../context/authContext";
import apiEstablishment from "../../services/apiEstablishment";
import apiBookings from "../../services/apiBookings";
import './bookings.css'

class CreateBooking extends Component {

  state = {
    day: undefined,
    startHour: 0,
    // duration: 0,
    sessions: false,
    bookingsInOneDay: undefined,
    arrayOfSessions: undefined,
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleBookingsInOneDay = (e) => {
    e.preventDefault()
    const { day } = this.state;
    const { establishment, history } = this.props;
    const bookingObj = { day };
    apiBookings
      .bookingsByDay(establishment._id, bookingObj)
      .then(({ data:bookingsInOneDay }) => {
        console.log(bookingsInOneDay)
        this.setState({
          bookingsInOneDay
        })
      })
      .catch((error)=> {
        console.log(error)
      })
  }

  handleHour(startHour){
    console.log("session selecionada",startHour)
    this.setState({
      startHour
    })
  }

  createBooking = (e) =>{
    e.preventDefault()
    const { day, startHour } = this.state;
    const { establishment, history } = this.props;
    console.log("props del create bookin",this.props)
    console.log("datos para realizar la booking:",this.state);
    const bookingObj = { day, startHour };
    apiBookings
      .newBooking(establishment._id, bookingObj)
      .then(({ data:booking }) => {
        history.push(`/bookings/`);
        // this.forceUpdate()
      })
      .catch((error)=> {
        console.log(error)
      })
  }

  searchSessions(){
    const { establishment } = this.props;
    let timeAllowedPerBooking = parseInt(establishment.timetable.timeAllowedPerBooking) //pasamos a timeAllowed a number
    const hourMinutesStrs = establishment.timetable.startHourShift;
    let startHourShift = parseInt(establishment.timetable.startHourShift);
    let finalHourShift = parseInt(establishment.timetable.finalHourShift);

    //sacamos los datos de cuantas sesiones de reservas van a haber durante el dia
    const horasAbierto = finalHourShift-startHourShift;
    console.log("horas abierto", horasAbierto);
    const sesionesTotales = (horasAbierto*60)/timeAllowedPerBooking;
    console.log("sesiones totales", sesionesTotales);

    const arrayOfSessions = [];
    const temp = hourMinutesStrs.split(':');
    let countHours = parseInt(temp[0])
    console.log("primera hora str",countHours)
    let countMinutes = parseInt(temp[1])
    let hoursStr = undefined;
    let minsStr = undefined;

    while (countHours < finalHourShift) {  //sacamos las horas o timeSessions en las que se van a poder reservar.
      countMinutes = countMinutes + timeAllowedPerBooking;
      if(countMinutes<60){
        hoursStr = countHours.toString();
        hoursStr = "0"+hoursStr;
        minsStr = countMinutes.toString();
        let finalTime = hoursStr.concat(':', minsStr);
        arrayOfSessions.push(finalTime)  //tendremos que hacer un join de las horas y los minutos para que sean una unidad y no 2.
      } else{
        countHours = countHours + 1;
        countMinutes = 0;
        hoursStr = countHours.toString();
        if(hoursStr<10){
          hoursStr = "0"+hoursStr;
        }
        minsStr = countMinutes.toString();
        let finalTime = hoursStr.concat(':', minsStr+0);
        arrayOfSessions.push(finalTime);
      }
    }
    hoursStr = startHourShift.toString();
    hoursStr = "0"+hoursStr;
    minsStr = countMinutes.toString();
    let finalTime = hoursStr.concat(':', minsStr+0);
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
    const { establishment } = this.props;
    const { maximumCapacity, percentOfPeopleAllowed } = establishment.capacity;
    const percentOfUsersAllowedInTheEstablishmentInCertainTime = Math.round(  //sacamos el numero total de usuarios que se van a permitir por sesión.
      (maximumCapacity * percentOfPeopleAllowed) / 100,
    );
    let cont = 0;
    return(
      <div>
        {arrayOfSessions.map((session)=>{
          cont=0;
          {/* console.log(session) */}
          bookingsInOneDay.map((booking)=>{
            if(booking.startHour===session){
              console.log("coincide la hora", booking.startHour, session)
              cont=cont+1
            }
          })
          return (
            <div key={session} className="sessions">
              {cont >= percentOfUsersAllowedInTheEstablishmentInCertainTime &&
                <button>{session}</button> //cambiarlo a div
              }
              {cont < percentOfUsersAllowedInTheEstablishmentInCertainTime && 
                <button onClick={()=>{this.handleHour(session)}}>{session}</button>
              }
              Reservas realizadas a esa hora: {cont}/{percentOfUsersAllowedInTheEstablishmentInCertainTime}
            </div>
          ) 
        })}
      </div>
    )
  }

  render(){
    const { establishment } = this.props;
    const { bookingsInOneDay, arrayOfSessions, sessions } = this.state;
    return(
      <div>
        {!bookingsInOneDay &&
          <div>
            <form onSubmit={this.handleBookingsInOneDay}>
              <label htmlFor="day">Day</label>
              <input
                type="date"
                name="day"
                id="day"
                required
                onChange={this.handleChange}
              />
              <input type="submit" value="submit" />
            </form>
        </div>
        }
        {bookingsInOneDay &&
          <div>
            Mostrar opciones para la reserva: (tabla de horas):
            {!sessions && this.searchSessions()}
            {/* {this.printSessions()} */}
            {arrayOfSessions && this.printSessions()}

            las bookings ya realizadas en ese dia: esto solamente es para mostrar que los datos son reales! las boookings
            {bookingsInOneDay.map((booking)=>{
            return <p key={booking._id}>{booking.startHour}</p>
            })
            }
            <button onClick={this.createBooking}>Create booking</button>
          </div>

        }
      </div>

    )
  }
}

export default withRouter(withAuth(CreateBooking));
