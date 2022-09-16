import { baseURL, FETCH_ALL_USER } from "./actionType";
import axios from "axios";

export const loginUser = (payload, cb) =>
    async () => {
        try {
            const { data } = await axios.post(baseURL + "/users/login", payload);
            if (data.role !== "Admin") throw { response: { data: { message: "Please login with admin account" } } }
            cb(null, data);

        } catch (error) {
            cb(error);
        }
    }

export const usersFetchSuccess = function (payload) {
    return {
        type: FETCH_ALL_USER,
        payload
    }
}

export const fetchUsers = (page, search, cb) =>
    async (dispatch) => {
        try {
            const { data } = await axios(baseURL + `/users?page=${page}&size=8&search=${search.query}`, {
                method: "GET",
                headers: {
                    access_token: localStorage.access_token
                }
            });
            dispatch(usersFetchSuccess(data));
            cb(null, data);
        } catch (error) {
            cb(error);
        }
    }

export const addNewAdmin = (payload, cb) =>
    async () => {
        try {
            const { data } = await axios(baseURL + `/users/registerAdmin`, {
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

export const updateUsersPassword = (userId, payload, cb) =>
    async () => {
        try {
            const { data } = await axios(baseURL + `/users/admin/${+userId}`, {
                method: "PUT",
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

export const deleteUser = (userId, cb) =>
    async () => {
        try {
            const { data } = await axios(baseURL + `/users/${+userId}`, {
                method: "DELETE",
                headers: {
                    access_token: localStorage.access_token
                }
            });

            cb(null, data);
        } catch (error) {
            cb(error);
        }
    }