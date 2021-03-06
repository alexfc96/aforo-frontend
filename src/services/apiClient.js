import axios from "axios";

class ApiClient {
  constructor() {
    this.apiClient = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URI,
      withCredentials: true,
    });
  }

  signup(body) {
    return this.apiClient.post("/signup", body);
  }

  login(body) {
    return this.apiClient.post("/login", body);
  }

  logout() {
    return this.apiClient.get("/logout");
  }

  whoami() {
    return this.apiClient.get("/whoami");
  }

  getUser(idUser) {
    return this.apiClient.get(`/user/${idUser}`);
  }

}

const apiClient = new ApiClient();
export default apiClient;
