import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BE,
})

instance.interceptors.request.use(function (config) {
    let token = localStorage.getItem("access_token");
    config.headers["Authorization"] = "Bearer " + token;
    return config;
  });

export default instance;