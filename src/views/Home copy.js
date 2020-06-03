
import React, { Component } from "react";
import { withAuth } from "../context/authContext";

import apiBookings from "../services/apiBookings";

// Calendar components.
import { DatePicker } from 'recal';
// Stylesheet for calendar.
import 'recal/lib/index.css';

const today = new Date();
today.setHours(0);
today.setMinutes(0);
today.setSeconds(0);
today.setMilliseconds(0);

class Home extends Component {
	static defaultProps = {
		// locale: 'es-MX'
		locale: 'en-US'
	};
	state = {
    date: null,
    bookings: undefined,
    daysWithBooking: undefined
	};

	onDateSelected = (date) => {
		this.setState({ date });
	};
	onDateHovered = (hovered) => {
		this.setState({ hovered })
	}
	
	isDateEnabled = (date) => {
		// Enable all days >= today.
		return date >= today;
  };
  
	isDateHighlighted = (date) => {
		// Highlight Sundays.
    // return date.getDay() == 0;
    const { daysWithBooking } = this.state;
    console.log("Los dais que tengo para poner como highlited son", daysWithBooking)
    return daysWithBooking.map((day)=>{
      return day.getDate()
    })
  };
  
  daysWithBooking(){
    console.log("Entro en saber ddias")
    const { bookings } = this.state;
    const daysWithBooking = []
    console.log("miro las bookings", bookings)
    bookings.map((booking)=>{
      var captureDay = new Date(booking.day);
      // let day = captureDay.getDate();
      // console.log("el dia de la reserva", day)
      daysWithBooking.push(captureDay)
    })
    this.setState({
      daysWithBooking
    })
  }

  getBookings(){
    apiBookings
    .bookings()
    .then(({ data:bookings }) => {
      this.setState({
        bookings
      });
      this.daysWithBooking()
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
    const { daysWithBooking, bookings,date } = this.state;
    console.log("date", date)
		return (
			<div id="App">
				<h2>Your bookings</h2>
        {bookings && daysWithBooking &&
          <DatePicker
					date={ this.state.date }
					onDateSelected={ this.onDateSelected }
					// onDateHovered={ this.onDateHovered }
					// isDateEnabled={ this.isDateEnabled }
					isDateHighlighted={ this.isDateHighlighted }
					locale={ this.props.locale } />
        }

				{/* { this.state.hovered ? (
					<p>
						You have booking this day 
						{ this.state.hovered.toDateString().slice(4) }
					</p>
				) : null } */}
				{/* { this.state.date ? (
					<p>
						<b>
							😈 Just kidding, there are no booking
							{ this.state.date.toDateString().slice(4) }!
						</b>
					</p>
				) : null } */}
			</div>
		);
	}
}

export default withAuth(Home);