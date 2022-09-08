import axios from "axios";

export const login = (payload, cb) => async (dispatch, useState) => {
  try {
    const { baseUrl } = useState();
    const { data } = await axios.post(baseUrl + "/users/login", payload);
    cb(null, data);
  } catch (error) {
    cb(error);
  }
};
