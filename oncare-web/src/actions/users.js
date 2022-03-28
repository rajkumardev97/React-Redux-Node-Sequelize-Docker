import { RETRIEVE_USERS, UPDATE_USER, DELETE_USER } from "./types";

import UserDataService from "../services/users.service";

export const retrieveUsers = () => async (dispatch) => {
  try {
    const res = await UserDataService.getAll();

    dispatch({
      type: RETRIEVE_USERS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = (id, data) => async (dispatch) => {
  try {
    const res = await UserDataService.update(id, data);

    dispatch({
      type: UPDATE_USER,
      payload: data
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    await UserDataService.delete(id);

    dispatch({
      type: DELETE_USER,
      payload: { id }
    });
  } catch (err) {
    console.log(err);
  }
};
