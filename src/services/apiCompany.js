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

  deleteCompany(idCompany) {
    return this.apiCompany.delete(`/company/${idCompany}`);
  }

  getProtected() {
    return this.apiCompany.get("/protected");
  }
}

const apiCompany = new ApiCompany();
export default apiCompany;