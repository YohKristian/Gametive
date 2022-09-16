import axios from "axios";
import baseUrl from "./baseUrl";

const fetchSuccess = (payload) => ({ type: "events/fetchSuccess", payload });
const fetchUserSuccess = (payload) => ({ type: "eventsUser/fetchSuccess", payload });
const fetchDetailSuccess = (payload) => ({ type: "eventDetail/fetchSuccess", payload });
const addEventSuccess = (payload) => ({ type: "events/addSuccess", payload });

export const fetchEvents = (keyword = "", page) => {
	return async (dispatch) => {
		return axios(baseUrl + `/events?page=${page}&size=4&search=${keyword}`, {
			headers: { access_token: localStorage.access_token },
		}).then((payload) => {
			dispatch(fetchSuccess(payload.data));
		});
	};
};

export const fetchYourEvents = (keyword = "", page) => {
	return async (dispatch) => {
		return axios(baseUrl + `/events/forUser?page=${page}&size=4&search=${keyword}`, {
			headers: { access_token: localStorage.access_token },
		}).then((payload) => {
			dispatch(fetchUserSuccess(payload.data));
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
				dispatch(addEventSuccess(res));
			})
			.catch((error) => {
				throw error;
			});
	};
};

export const editEvent = (id, data) => {
	return async (dispatch) => {
		return axios
			.put(baseUrl + "/events/" + id, data, {
				headers: {
					access_token: localStorage.access_token,
				},
			})
			.then((res) => res)
			.catch((error) => {
				throw error;
			});
	};
};

export const editBracket = (id, data) => {
	return async (dispatch) => {
		return axios
			.put(baseUrl + "/events/" + id + "/bracket", { bracket: data }, { headers: { access_token: localStorage.access_token } })
			.then((res) => res)
			.catch((error) => {
				throw error;
			});
	};
};
