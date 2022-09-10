import axios from "axios"
import { baseUrl } from './baseUrl'

export const fetchSuccess = (payload) => {
    return {
        type: 'events/fetchSuccess',
        payload,
    }
}

export const fetchEvents = function () {
    return function (dispatch) {
        return axios(baseUrl + `/events?page=1&size=4&search`)
            .then((payload) => {
                dispatch(fetchSuccess(payload.data.items))
            })
    }
}