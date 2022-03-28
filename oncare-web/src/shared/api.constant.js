export const BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api";

export const API_CONSTANTS = {
  AUTH: {
    REGISTER: `${BASE_URL}/auth/signup`,
    SIGNIN: `${BASE_URL}/auth/signin`
  },
  USERS: {
    GET_USERS: `${BASE_URL}/users`
  }
};
