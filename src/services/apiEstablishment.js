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

  getEstablishmentByCompany(idCompany) {
    return this.apiEstablishment.get(`/establishment/by-company/${idCompany}`);
  }

  getEstablishmentByName(body) {
    return this.apiEstablishment.post(`/establishment/by-name`, body);
  }

  createEstablishment(body) {
    return this.apiEstablishment.post(`/establishment/create`, body);
  }

  updateEstablishment(idEstablishment, body) {
    return this.apiEstablishment.put(`/establishment/${idEstablishment}/admin`, body);
  }

  joinClientEstablishment(idEstablishment, userID) {
    return this.apiEstablishment.post(`/establishment/${idEstablishment}/join-client/${userID}`);
  }

  joinOwnerEstablishment(idEstablishment, userID) {
    return this.apiEstablishment.post(`/establishment/${idEstablishment}/join-owner/${userID}`);
  }

  putEstablishmentInFavorites(idEstablishment) {
    return this.apiEstablishment.post(`/establishment/${idEstablishment}/favorite`);
  }

  removeEstablishmentOfFavorites(idEstablishment) {
    return this.apiEstablishment.post(`/establishment/${idEstablishment}/remove-favorite`);
  }

  deleteClientEstablishment(idEstablishment, userID) {
    return this.apiEstablishment.delete(`/establishment/${idEstablishment}/remove-client/${userID}`);
  }

  deleteOwnerEstablishment(idEstablishment, userID) {
    return this.apiEstablishment.delete(`/establishment/${idEstablishment}/remove-owner/${userID}`);
  }

  deleteEstablishment(idEstablishment) {
    return this.apiEstablishment.delete(`/establishment/${idEstablishment}`);
  }
}

const apiEstablishment = new ApiEstablishment();
export default apiEstablishment;