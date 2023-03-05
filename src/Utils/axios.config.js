import axios from "axios";

const api = axios.create({
  // baseURL: "https://13.200.6.251:3001",
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  // withCredentials: true,
});

export default api;
