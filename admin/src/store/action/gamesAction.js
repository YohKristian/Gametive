import { baseURL, FETCH_ALL_GAME } from "./actionType";
import axios from "axios";

export const gamesFetchSuccess = function (payload) {
    return {
        type: FETCH_ALL_GAME,
        payload
    }
}

export const fetchGames = (cb) =>
    async (dispatch) => {
        try {
            const { data } = await axios(baseURL + `/games?page=1&size=8&search`, {
                method: "GET"
            });
            dispatch(gamesFetchSuccess(data));
            cb(null, data);
        } catch (error) {
            cb(error);
        }
    }