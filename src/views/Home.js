import React, { Component } from "react";
import DayPicker from 'react-day-picker';
import { Link } from "react-router-dom";

//http://react-day-picker.js.org/examples/selected

import 'react-day-picker/lib/style.css';
import apiBookings from "../services/apiBookings";
import apiClient from "../services/apiClient";

import { withAuth } from "../context/authContext";

class Home extends Component {

  state = {
    bookings: undefined,
    fullUser: undefined
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

  getUser(){
    const { user } = this.props;
    apiClient
    .getUser(user._id)
    .then(({ data:fullUser }) => {
      if(fullUser.favoriteEstablishments.length>0){
        this.setState({
          fullUser
        })
      }
    })
    .catch((error) => {
      console.log(error)
    });
  }

  componentWillUnmount(){
    this.bookings= false;
    this.fullUser= false;
  }

  componentDidMount(){
    this.getBookings()
    this.getUser()
  }

  render() {
    const { user } = this.props;
    const { bookings, fullUser } = this.state;
    return (
      <div>
        <h1 style={{textAlign:"left", marginLeft:"5%"}}>Welcome {user.name}</h1><br/>

        <h3 style={{margin: "-20px 0 10px 0"}}>Your bookings:</h3>
        {bookings && 
          <DayPicker selectedDays={bookings.map((booking)=>{
            return new Date(booking.day)
          }
          )} />
        }
        {fullUser && 
          <div>
            <h3 style={{margin: "0 0 10px 0"}}>Your favorites establishments:</h3>
            <ul>
              {fullUser.favoriteEstablishments.map((establishment) =>{
                return <li style={{display: "flex", marginBottom:"2%"}} key={establishment._id}><Link to={`/establishment/${establishment._id}`}>·{establishment.name}</Link></li>
              })

              }

            </ul>

          </div>
        }
      </div>
    );
  }
}

export default withAuth(Home);
