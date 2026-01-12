import axios from "axios";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

const apiClient = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // 🔥 ALWAYS ENABLED
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Global response interceptor
 * Handles auth errors in ONE place
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized – redirecting to login");
      // optional:
      // window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
