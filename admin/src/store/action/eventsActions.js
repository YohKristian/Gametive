import { baseURL, FETCH_ALL_EVENT } from "./actionType";
import axios from "axios";

export const eventsFetchSuccess = function (payload) {
    return {
        type: FETCH_ALL_EVENT,
        payload
    }
}

export const fetchEvents = (cb) =>
    async (dispatch) => {
        try {
            const { data } = await axios(baseURL + "/events?page=1&size=8&search", {
                method: "GET"
            });
            dispatch(eventsFetchSuccess(data));
            cb(null, data);
        } catch (error) {
            cb(error);
        }
    }