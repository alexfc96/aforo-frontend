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

  getEstablishmentByName(name) {
    return this.apiEstablishment.get(`/establishment/by-name/${name}`);
  }

  createEstablishment(body) {
    return this.apiEstablishment.post(`/establishment/create`, body);
  }

  updateEstablishment(idEstablishment, body) {
    return this.apiEstablishment.put(`/establishment/${idEstablishment}/admin`, body);
  }

  joinOwner(idEstablishment, userID) {
    return this.apiEstablishment.post(`/establishment/${idEstablishment}/join-owner/${userID}`);
  }

  deleteEstablishment(idEstablishment) {
    return this.apiEstablishment.delete(`/establishment/${idEstablishment}`);
  }
}

const apiEstablishment = new ApiEstablishment();
export default apiEstablishment;