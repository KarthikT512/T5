// client/src/components/courses/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://t5-in2v.onrender.com",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("t5_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
