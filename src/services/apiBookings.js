import axios from "axios";

class ApiBookings {
  constructor() {
    this.apiBookings = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URI,
      withCredentials: true,
    });
  }

  allBookings() {
    return this.apiBookings.get("/establishment/all-bookings");
  }

  bookings() {
    return this.apiBookings.get("/establishment/bookings");
  }

  oldBookings() {
    return this.apiBookings.get("/establishment/old-bookings");
  }

  bookingsByDay(idEstablishment, body) {
    return this.apiBookings.post(`/establishment/get-bookings-by-day/${idEstablishment}`, body);
  }

  bookingsBySession(idEstablishment, body) {
    return this.apiBookings.post(`/establishment/${idEstablishment}/get-users-of-session/`, body);
  }

  newBooking(idEstablishment, body) {
    return this.apiBookings.post(`/establishment/${idEstablishment}/booking`, body);
  }

  deleteBooking(idEstablishment,idBooking) {
    return this.apiBookings.delete(`/establishment/${idEstablishment}/delete-booking/${idBooking}`);
  }

}

const apiBookings = new ApiBookings();
export default apiBookings;