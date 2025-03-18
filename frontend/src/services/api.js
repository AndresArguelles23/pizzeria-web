// frontend/src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Interceptor para agregar el token en cada petición
api.interceptors.request.use(
  (config) => {
   
    const token = localStorage.getItem("token");
    console.log("Interceptor - Token a enviar:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
