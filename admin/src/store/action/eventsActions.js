import { baseURL, FETCH_ALL_EVENT, FETCH_DETAIL_EVENT } from "./actionType";
import axios from "axios";

export const eventsFetchSuccess = function (payload) {
	return {
		type: FETCH_ALL_EVENT,
		payload,
	};
};

export const fetchEvents = (page, search) => async (dispatch) => {
	return axios(baseURL + `/events/admin?page=${page || 1}&size=8&search=${search?.query || ""}`, {
		method: "GET",
		headers: { access_token: localStorage.access_token },
	}).then(({ data }) => dispatch(eventsFetchSuccess(data)));
};

export const patchStatusEvents = (eventId, eventStatus, cb) => async (dispatch) => {
	try {
		const { data } = await axios(baseURL + `/events/${+eventId}`, {
			method: "PATCH",
			data: { eventStatus },
			headers: {
				access_token: localStorage.access_token,
			},
		});

		cb(null, data);
	} catch (error) {
		cb(error);
	}
};

const fetchEventDetailSuccess = (payload) => {
	return {
		type: FETCH_DETAIL_EVENT,
		payload,
	};
};

export const fetchDetailEvent = (id, cb) => async (dispatch) => {
	try {
		const { data } = await axios(baseURL + `/events/${+id}`, {
			method: "get",
		});
		console.log(data);
		dispatch(fetchEventDetailSuccess(data));
		cb(null, data);
	} catch (error) {
		cb(error);
	}
};

export const editEvent = (id, input, cb) => async (dispatch) => {
	try {
		console.log(input, "ini input");
		const { data } = await axios(`${baseURL}/events/${id}`, {
			method: "PUT",
			data: input,
			headers: {
				access_token: localStorage.access_token,
			},
		});
		dispatch(fetchEvents());
		cb(null, data);
	} catch (error) {
		cb(error);
	}
};
