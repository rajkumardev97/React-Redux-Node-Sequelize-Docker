import axios from "axios";
import { API_CONSTANTS } from "../shared/api.constant";

class AuthService {
  register(username, email, password) {
    return axios.post(API_CONSTANTS.AUTH.REGISTER, {
      username,
      email,
      password
    });
  }

  login(username, password) {
    return axios
      .post(API_CONSTANTS.AUTH.SIGNIN, { username, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }
}

export default new AuthService();
