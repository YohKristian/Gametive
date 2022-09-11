import axios from "axios";
import baseUrl from "./baseUrl";

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