import axios from "axios";

class ApiBookings {
  constructor() {
    this.apiBookings = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URI,
      withCredentials: true,
    });
  }

  bookings() {
    return this.apiBookings.get("/establishment/bookings");
  }

  newBooking(idEstablishment, body) {
    return this.apiBookings.post(`/establishment/${idEstablishment}/booking`, body);
  }

  // getBooking(idBooking) {
  //   return this.apiBookings.get(`/bookings/${idBooking}`);
  // }

  deleteBooking(idEstablishment,idBooking) {
    return this.apiBookings.delete(`/establishment/${idEstablishment}/delete-booking/${idBooking}`);
  }

}

const apiBookings = new ApiBookings();
export default apiBookings;