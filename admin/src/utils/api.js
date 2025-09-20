import axios from "axios";
import { backendUrl } from "../App";

const api = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["token"] = token;
  } else {
    delete api.defaults.headers.common["token"];
  }
};

export default api;
