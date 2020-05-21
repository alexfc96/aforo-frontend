import axios from "axios";

class ApiUser {
  constructor() {
    this.apiUser = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URI,
      withCredentials: true,
    });
  }

  // establishment() {
  //   return this.apiEstablishment.get("/establishment/establishments");
  // }

  getUser(idUser) {
    return this.apiUser.get(`/user/${idUser}`);
  }

  updateUser(idUser, body) {
    return this.apiUser.put(`/user/${idUser}/update`, body);
  }

  // getEstablishment(idEstablishment) {
  //   return this.apiEstablishment.get(`/establishment/${idEstablishment}`);
  // }

  // deleteCompany(idCompany) {
  //   return this.apiEstablishment.delete(`/company/${idCompany}`);
  // }

  // getProtected() {
  //   return this.apiEstablishment.get("/protected");
  // }
}

const apiUser = new ApiUser();
export default apiUser;