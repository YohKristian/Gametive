import axios from "axios";
import baseUrl from "./baseUrl";

const fetchSuccess = (payload) => ({ type: "events/fetchSuccess", payload });
const fetchDetailSuccess = (payload) => ({ type: "eventDetail/fetchSuccess", payload });
const addEventSuccess = (payload) => ({ type: "events/addSuccess", payload });

export const fetchEvents = (keyword = "") => {
	return async (dispatch) => {
		return axios(baseUrl + `/events?page=1&size=4&search=${keyword}`).then((payload) => {
			dispatch(fetchSuccess(payload.data.items));
		});
	};
};

export const fetchEventDetail = (id) => {
	return async (dispatch, useState) => {
		const { eventsReducer } = useState();
		// if (!eventsReducer.events.length) {
		return axios.get(baseUrl + "/events/" + id).then(({ data }) => {
			dispatch(fetchDetailSuccess(data));
			return data;
		});
		// }
		const data = eventsReducer.events.filter((el) => el.id === +id)[0];
		dispatch(fetchDetailSuccess(data));
	};
};

export const addEvent = (data) => {
	return async (dispatch) => {
		console.log(data, "data dari action");
		return axios
			.post(baseUrl + "/events/add", data, { headers: { access_token: localStorage.access_token } })
			.then((res) => {
				dispatch(addEvent(res));
			})
			.catch((error) => {
				throw error;
			});
	};
};
