import axios from "axios";
import { getToken } from "./storage";

const instance = axios.create({
  baseURL: "https://task-react-auth-backend.eapi.joincoded.com/api",
});
// this is to intercept the header info in a request and make sure it has the correct authorization
instance.interceptors.request.use(async (request) => {
  const token = await getToken();
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

export default instance;
