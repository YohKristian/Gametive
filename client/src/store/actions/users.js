import axios from "axios";
import { FETCH_USER_HISTORY } from "./actionType";
import baseUrl from "./baseUrl";

const fetchHistorySuccess = (payload) => ({ type: FETCH_USER_HISTORY, payload });

export const login = (payload) => async () => {
  return await axios.post(baseUrl + "/users/login", payload);
};

export const register = (payload) => async () => {
  return await axios.post(baseUrl + "/users/register", payload);
};

export const updateUsersPassword = (username, payload, cb) =>
  async () => {
    try {
      const { data } = await axios(baseUrl + `/users/${username}`, {
        method: "PUT",
        data: payload,
        headers: {
          access_token: localStorage.access_token
        }
      });

      cb(null, data);
    } catch (error) {
      cb(error);
    }
  }

export const getHistoryUser = () =>
  (dispatch) => {
    return axios(baseUrl + `/users/history`, {
      method: "GET",
      headers: {
        access_token: localStorage.access_token
      }
    })
      .then(({ data }) => {
        dispatch(fetchHistorySuccess(data));
      })
  }