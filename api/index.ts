import axios from "axios";
import { getToken } from "./storage";

const instance = axios.create({
  baseURL: "https://task-react-auth-backend.eapi.joincoded.com/api",
});

// Add token to all requests
instance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
