import axios from "axios";
import packageJson from "../../../package.json";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    "x-app-name": `comission-front.v${packageJson.version}`,
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log, toast, or transform errors here
    return Promise.reject(error);
  },
);
