import { combineReducers } from "redux";
import auth from "./auth";
import users from "./users";
import message from "./message";

export default combineReducers({
  auth,
  users,
  message
});
