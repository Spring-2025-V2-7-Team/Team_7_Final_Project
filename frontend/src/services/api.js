import axios from "axios";

const API = axios.create({
  baseURL: "http://team7finalproject-production.up.railway.app",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized, redirect to login if needed");
    }
    return Promise.reject(error);
  }
);

export default API;