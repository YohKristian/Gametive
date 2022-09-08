import axios from "axios";

export const login = (payload, cb) => async (_, useState) => {
  try {
    const { baseUrl } = useState();
    const { data } = await axios.post(baseUrl + "/users/login", payload);
    cb(null, data);
  } catch (error) {
    cb(error);
  }
};

export const register = (payload, cb) => async (_, useState) => {
  try {
    const { baseUrl } = useState();
    await axios.post(baseUrl + "/users/register", payload);
    cb();
  } catch (error) {
    cb(error);
  }
};
