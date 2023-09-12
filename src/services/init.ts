import axios from "axios";

export const baseURL =
    process.env.REACT_APP_BACKEND_URI || "http://127.0.0.1:4000/api/";

let axiosInstance = axios.create({
    baseURL,
    params: {},
});

export default axiosInstance;
