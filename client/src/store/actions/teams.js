import axios from "axios";
import baseUrl from "./baseUrl";

const fetchSuccess = (payload) => ({ type: "teams/fetchSuccess", payload });
const createTeamSuccess = (payload) => ({
  type: "teams/createSuccess",
  payload,
});

export const fetchTeams = () => {
  return async (dispatch) => {
    return axios
      .get(`${baseUrl}/teams/all-teams`, {
        headers: { access_token: localStorage.access_token },
      })
      .then((payload) => {
        dispatch(fetchSuccess(payload.data));
      });
  };
};

export const createTeam = (payload) => {
  return async (dispatch) => {
    return axios
      .post(`${baseUrl}/teams/create`, payload, {
        headers: {
          access_token: localStorage.access_token,
        },
      })
      .then((result) => {
        dispatch(createTeamSuccess(result));
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const deleteTeam = (teamId) =>
  () => {
    return axios(`${baseUrl}/teams/delete/${+teamId}`, {
      method: "PATCH",
      headers: {
        access_token: localStorage.access_token
      }
    })
  }
