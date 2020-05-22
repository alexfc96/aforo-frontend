import React, { Component } from "react";
import { withAuth } from "../../context/authContext";
import { Link } from "react-router-dom";

import apiCompany from "../../services/apiCompany";
import apiBookings from "../../services/apiBookings";
import apiEstablishment from "../../services/apiEstablishment";

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

  async getNameEstablishment(establishmentID){
    console.log('Enntro en nameEstabli',establishmentID)
    try {
      const nameEstablishment = await apiEstablishment.getEstablishment(establishmentID)
      console.log('El name del establishment',nameEstablishment.data.name)
      return nameEstablishment.data.name  //espera setState para que se pueda pintar en la pantalla? pero entonces pierdo el hilo del map
    } catch (error) {
      console.log(error)
    }
    // apiEstablishment
    // .getEstablishment(establishment)
    // .then(({ data: establishment }) => {
    //   console.log(establishment.name)
    //   return establishment.name
    // })
    // .catch((error) => {
    //   console.log(error)
    // });
  }

  async getEstablishment(establishmentID){
    const nameOfEstablishment = await this.getNameEstablishment(establishmentID);
    console.log(nameOfEstablishment)
      return (
        <div>
          <div className="one-establishment-of-the-list">
            <div className="info-establishment">
            sadads
              <Link to={`/establishment/${establishmentID}`}><h3>{nameOfEstablishment}</h3></Link>
            </div>
          </div>
          <hr/>
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
        {!bookings &&
          <p> It seems that you dont any booking scheduled</p>
        }
        {bookings &&
          <div>
            <ul>
              {bookings.map(async(booking)=>{
                //this.getCompany(booking.idEstablishment) //tendremos que buscar la company apartir del establishment
                return <li key={booking._id}>
                        {await this.getEstablishment(booking.idEstablishment)}
                        <button onClick={()=>{this.deleteBooking(booking._id, booking.idEstablishment)}}>Delete Booking</button>
                        <h3>{booking.startTime}</h3>
                        <h3>{booking.endingTime}</h3>
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