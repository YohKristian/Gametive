import { baseURL, FETCH_ALL_GAME } from "./actionType";

import axios from "axios";

export const gamesFetchSuccess = function (payload) {
	return {
		type: FETCH_ALL_GAME,
		payload,
	};
};

export const fetchGames = (cb) => async (dispatch) => {
	try {
		const { data } = await axios(baseURL + `/games?page=1&size=100&search=`, {
			method: "GET",
		});
		dispatch(gamesFetchSuccess(data));
		cb(null, data);
	} catch (error) {
		cb(error);
	}
};

export const fetchGamesDetail = (id) => () => {
		return axios(baseURL + `/games/${id}`, {
			method: "GET",
		});
};

export const addGames = (payload, cb) => async () => {
	try {
		const { data } = await axios(baseURL + `/games`, {
			method: "POST",
			data: payload,
			headers: {
				access_token: localStorage.access_token,
			},
		});

		cb(null, data);
	} catch (error) {
		cb(error);
	}
};

export const deleteGame = (gameId, cb) => async () => {
	try {
		const { data } = await axios(baseURL + `/games/${+gameId}`, {
			method: "DELETE",
			headers: {
				access_token: localStorage.access_token,
			},
		});

		cb(null, data);
	} catch (error) {
		cb(error);
	}
};
