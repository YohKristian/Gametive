import axios from "axios";
import { FETCH_DETAIL_TEAM } from "./actionType";
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

export const getDetailTeamSuccess=(payload)=>{
  return{
    type: FETCH_DETAIL_TEAM,
    payload
  }
}

  export const fetchDetailTeam= (id) =>async (dispatch)=>{
    
    return axios(`${baseUrl}/teams/${id}`,{
      method: 'get',
      headers: {
        access_token: localStorage.access_token
      }
    })

    .then((data)=>{
      dispatch(getDetailTeamSuccess(data))
    })
    .catch((error)=>{
      console.log(error);
    })
  }