import { baseURL } from "./actionTypes";
import axios from "axios";

export const loginUser = (payload, cb) =>
    async () => {
        try {
            const { data } = await axios.post(baseURL + "/users/login", payload);
            cb(null, data);
        } catch (error) {
            cb(error);
        }
    }