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

  // getBooking(idBooking) {
  //   return this.apiBookings.get(`/bookings/${idBooking}`);
  // }

  // deleteCompany(idCompany) {
  //   return this.apiEstablishment.delete(`/company/${idCompany}`);
  // }

}

const apiBookings = new ApiBookings();
export default apiBookings;