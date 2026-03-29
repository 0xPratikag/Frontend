import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
//   withCredentials: true, // remove if you don't need cookies
});

// baseapi like for login,singup etc purpose


export const BaseapiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_LOGIN_URL,
  headers: {
    "Content-Type": "application/json",
  },
//   withCredentials: true, // remove if you don't need cookies
});


