import axios from "axios";
import { API_CONSTANTS } from "../shared/api.constant";

class UserDataService {
  getAll() {
    return axios.get(API_CONSTANTS.USERS.GET_USERS).then((response) => {
      return response.data;
    });
  }

  get(id) {
    return axios
      .get(API_CONSTANTS.USERS.GET_USERS + `/${id}`)
      .then((response) => {
        return response.data;
      });
  }

  update(id, data) {
    return axios
      .put(API_CONSTANTS.USERS.GET_USERS + `/${id}`, data)
      .then((response) => {
        return response.data;
      });
  }

  delete(id) {
    return axios
      .delete(API_CONSTANTS.USERS.GET_USERS + `/${id}`)
      .then((response) => {
        return response.data;
      });
  }
}

export default new UserDataService();
