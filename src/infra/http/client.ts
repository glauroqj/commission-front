import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "/api",
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log, toast, or transform errors here
    return Promise.reject(error);
  },
);
