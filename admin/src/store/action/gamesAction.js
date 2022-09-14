import { baseURL, FETCH_ALL_GAME, FETCH_DETAIL_GAME } from "./actionType";
import axios from "axios";

export const gamesFetchSuccess = function (payload) {
    return {
        type: FETCH_ALL_GAME,
        payload
    }
}

export const gameFetchSuccess = function (payload) {
    return {
        type: FETCH_DETAIL_GAME,
        payload
    }
}

export const fetchGames = (page, search, cb) =>
    async (dispatch) => {
        try {
            const { data } = await axios(baseURL + `/games?page=${page}&size=8&search=${search.query}`, {
                method: "GET"
            });

            dispatch(gamesFetchSuccess(data));
            cb(null, data);
        } catch (error) {
            console.log(error);
            cb(error);
        }
    }

export const fetchGamesEdit = (cb) =>
    async (dispatch) => {
        try {
            const { data } = await axios(baseURL + `/games?page=1&size=99&search=`, {
                method: "GET"
            });

            dispatch(gamesFetchSuccess(data));
            cb(null, data);
        } catch (error) {
            cb(error);
        }
    }

export const addGames = (payload, cb) =>
    async () => {
        try {
            const { data } = await axios(baseURL + `/games`, {
                method: "POST",
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

export const deleteGame = (gameId, cb) =>
    async () => {
        try {
            const { data } = await axios(baseURL + `/games/${+gameId}`, {
                method: "PATCH",
                headers: {
                    access_token: localStorage.access_token
                }
            });

            cb(null, data);
        } catch (error) {
            cb(error);
        }
    }

export const fetchGameDetail = (gameId, cb) =>
    async (dispatch) => {
        try {
            const { data } = await axios(baseURL + `/games/${+gameId}`, {
                method: "GET",
            });

            dispatch(gameFetchSuccess(data));
            cb(null, data);
        } catch (error) {
            cb(error);
        }
    }

export const submitEditGameDetail = (gameId, updatedGame, cb) =>
    async (dispatch) => {
        try {
            const { data } = await axios(baseURL + `/games/${+gameId}`, {
                method: "PUT",
                data: updatedGame,
                headers: {
                    access_token: localStorage.access_token
                }
            });

            cb(null, data);
        } catch (error) {
            cb(error);
        }
    }