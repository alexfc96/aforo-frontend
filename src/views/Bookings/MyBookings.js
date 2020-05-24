import React, { Component } from "react";
import { withAuth } from "../../context/authContext";
import { Link } from "react-router-dom";

import apiCompany from "../../services/apiCompany";
import apiBookings from "../../services/apiBookings";
// import apiEstablishment from "../../services/apiEstablishment";

class MyBookings extends Component {
  state = {
    companies : undefined,
    bookings: undefined,
    establishments: undefined,
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

  componentDidMount(){
    this.getBookings()
  }

  render() {
    // const { user } = this.props;
    const { companies, establishments, bookings } = this.state;
    return (
      <div>
        <h1>My bookings</h1>
        {bookings && bookings.length === 0 &&
          <p> It seems that you dont any booking scheduled</p>
        }
        {bookings &&
          <div>
            <ul>
              {bookings.map((booking)=>{
                //this.getCompany(booking.idEstablishment) //tendremos que buscar la company apartir del establishment
                return <li key={booking._id}>
                        <Link to={`/establishment/${booking.idEstablishment._id}`}><h3>{booking.idEstablishment.name}</h3></Link>
                        {/* {this.getEstablishment(booking.idEstablishment)} */}
                        <h3>Day:{booking.day}</h3>
                        <h3>Start hour:{booking.startHour}</h3>
                        <h3>Duration:{booking.duration} mins</h3>
                        <button onClick={()=>{this.deleteBooking(booking._id, booking.idEstablishment)}}>Delete Booking</button>
                      </li>
              })
            }
            </ul>
          </div>
        }
      </div>
    );
  }
}

export default withAuth(MyBookings);