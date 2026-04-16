import axios from "axios";

const normalizeBaseUrl = (url = "") => url.replace(/\/+$/, "");

// General authenticated APIs
export const apiClient = axios.create({
  baseURL: normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL),
  headers: {
    "Content-Type": "application/json",
  },
});

// Base APIs like login/signup
export const BaseapiClient = axios.create({
  baseURL: normalizeBaseUrl(import.meta.env.VITE_API_BASE_LOGIN_URL),
  headers: {
    "Content-Type": "application/json",
  },
});

// Therapist specific API client
export const therapistApiClient = axios.create({
  baseURL: `${normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL)}/therapist`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Therapist token auto attach
therapistApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("therapistToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: auto logout on 401
therapistApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("therapistToken");
      localStorage.removeItem("therapistUser");
    }
    return Promise.reject(error);
  }
);