import { useAuthStore } from "@/features/auth/stores/useAuthStore";
import axios from "axios";

let isConfigured = false;

export const configureAxios = () => {
  if (isConfigured) return;

  axios.defaults.baseURL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

  axios.interceptors.request.use(
    (config) => {
      const token = useAuthStore.getState().token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  axios.interceptors.response.use(
    (response) => {
      const body = response.data;

      if (
        body &&
        typeof body === "object" &&
        "success" in body &&
        "data" in body
      ) {
        return body.data;
      }

      return body;
    },
    (error) => {
      if (error.response?.status === 401) {
        useAuthStore.getState().clearAuth();
      }
      return Promise.reject(error);
    },
  );

  isConfigured = true;
};
