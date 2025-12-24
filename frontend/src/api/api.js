import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  withCredentials: true, // useful if you use cookies / sessions
  headers: {
    "Content-Type": "application/json",
  },
});

// /* =========================
//    REQUEST INTERCEPTOR
// ========================= */
// api.interceptors.request.use(
//   (config) => {
//     // Example: attach auth token if present
//     const token = localStorage.getItem("auth_token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// /* =========================
//    RESPONSE INTERCEPTOR
// ========================= */
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Global error handling
//     if (error.response) {
//       console.error(
//         "API Error:",
//         error.response.status,
//         error.response.data
//       );
//     } else {
//       console.error("Network / CORS error:", error.message);
//     }

//     return Promise.reject(error);
//   }
// );

export default api;
