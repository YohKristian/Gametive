import axios from "axios";
import baseUrl from "./baseUrl";

export const login = (payload) => async () => {
  return await axios.post(baseUrl + "/users/login", payload);
};

export const register = (payload) => async () => {
  return await axios.post(baseUrl + "/users/register", payload);
};
