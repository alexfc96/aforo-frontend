import axios from "axios";

class ApiUser {
  constructor() {
    this.apiUser = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URI,
      withCredentials: true,
    });
  }

  getUser(idUser) {
    return this.apiUser.get(`/user/${idUser}`);
  }

  getUserByMail(mail) {
    return this.apiUser.get(`/user/by-mail/${mail}`);
  }

  updateUser(idUser, body) {
    return this.apiUser.put(`/user/${idUser}/update`, body);
  }

  // deleteCompany(idCompany) {
  //   return this.apiEstablishment.delete(`/company/${idCompany}`);
  // }

}

const apiUser = new ApiUser();
export default apiUser;