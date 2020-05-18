import axios from "axios";

class ApiEstablishment {
  constructor() {
    this.apiEstablishment = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URI,
      withCredentials: true,
    });
  }

  establishment() {
    return this.apiEstablishment.get("/establishment/establishments");
  }

  getUser(idUser) {
    return this.apiEstablishment.get(`/user/${idUser}`);
  }

  getEstablishment(idEstablishment) {
    return this.apiEstablishment.get(`/establishment/${idEstablishment}`);
  }

  // deleteCompany(idCompany) {
  //   return this.apiEstablishment.delete(`/company/${idCompany}`);
  // }

  // getProtected() {
  //   return this.apiEstablishment.get("/protected");
  // }
}

const apiEstablishment = new ApiEstablishment();
export default apiEstablishment;