import axios from "axios";
import baseUrl from "./baseUrl";

const fetchSuccess = (payload) => {
  return {
    type: "events/fetchSuccess",
    payload,
  };
};

const fetchDetailSuccess = (payload) => {
  return {
    type: "eventDetail/fetchSuccess",
    payload,
  };
};

export const fetchEvents = () => {
  return async (dispatch) => {
    return axios(baseUrl + `/events?page=1&size=4&search`).then((payload) => {
      dispatch(fetchSuccess(payload.data.items));
    });
  };
};

export const fetchEventDetail = (id) => {
  return async (dispatch, useState) => {
    const { eventsReducer } = useState();
    if (!eventsReducer.events.length) {
      return axios.get(baseUrl + "/events/" + id).then(({ data }) => {
        dispatch(fetchDetailSuccess(data));
      });
    }
    const data = eventsReducer.events.filter((el) => el.id === +id)[0];
    dispatch(fetchDetailSuccess(data));
  };
};
