import axios from "axios";

class ApiCompany {
  constructor() {
    this.apiCompany = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URI,
      withCredentials: true,
    });
  }

  company() {
    return this.apiCompany.get("/company/companies");
  }

  getUser(idUser) {
    return this.apiCompany.get(`/user/${idUser}`);
  }

  getCompany(idCompany) {
    return this.apiCompany.get(`/company/${idCompany}`);
  }

  createCompany(body) {
    return this.apiCompany.post(`/company/create`, body);
  }

  joinOwnerCompany(idCompany, userID) {
    return this.apiCompany.post(`/company/${idCompany}/join-owner/${userID}`);
  }

  deleteOwnerCompany(idCompany, userID) {
    return this.apiCompany.delete(`/company/${idCompany}/remove-owner/${userID}`);
  }

  deleteCompany(idCompany) {
    return this.apiCompany.delete(`/company/${idCompany}`);
  }

  updateCompany(idCompany, body) {
    return this.apiCompany.put(`/company/${idCompany}/admin`, body);
  }

  getProtected() {
    return this.apiCompany.get("/protected");
  }
}

const apiCompany = new ApiCompany();
export default apiCompany;