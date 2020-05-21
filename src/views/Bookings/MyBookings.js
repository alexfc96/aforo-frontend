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

  async getNameEstablishment(establishment){
    console.log('estoy dentro de getnameEstablishment', establishment)
    apiEstablishment
    .getEstablishment(establishment)
    .then(({ data: establishment }) => {
      console.log(establishment.name)
      return establishment.name
    })
    .catch((error) => {
      console.log(error)
    });
  }

  async getEstablishment(establishment){
    const nameOfEstablishment = await this.getNameEstablishment(establishment)
    console.log(nameOfEstablishment)
      return (
        <div key={establishment}>
          <div className="one-establishment-of-the-list">
            <div className="info-establishment">
            sadads
              <Link to={`/establishment/${establishment}` }><h3>{nameOfEstablishment}</h3></Link>
            </div>
          </div>
          <hr/>
        </div>
      )
  }

  componentDidMount(){
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
              {bookings.map((booking)=>{
                //this.getCompany(booking.idEstablishment) //tendremos que buscar la company apartir del establishment
                return (
                  <div key={booking._id}>
                    {this.getEstablishment(booking.idEstablishment)}
                    <li>
                        <h3>{booking.startTime}</h3>
                        <h3>{booking.endingTime}</h3>
                    </li>
                  </div>
                )
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