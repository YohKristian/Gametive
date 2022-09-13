import { baseURL } from "./actionType";

import axios from "axios";

export const participantsPaymentToken = (payload) => () => {
    return axios(baseURL + `/midtrans/snap-token`, {
        method: "POST",
        data: payload,
        headers: {
            access_token: localStorage.access_token,
        },
    });
};

export const addParticipants = (payload) => () => {
    return axios(baseURL + `/participants`, {
        method: "POST",
        data: payload,
        headers: {
            access_token: localStorage.access_token,
        },
    });
};

export const registerParticipantToBracket = (payload) => () => {
    return axios(baseURL + `/participants/${payload.EventId}/${payload.TeamId}`, {
        method: "PUT",
        headers: {
            access_token: localStorage.access_token,
        },
    });
};