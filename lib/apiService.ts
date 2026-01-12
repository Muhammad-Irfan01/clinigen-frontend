import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

/* ================= AXIOS INSTANCE ================= */
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // ✅ REQUIRED for cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Track refresh attempts to prevent infinite loops
let refreshAttempts = 0;
const MAX_REFRESH_ATTEMPTS = 3;

/* ================= RESPONSE INTERCEPTOR ================= */
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      // Prevent infinite refresh attempts
      if (refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
        console.log(`Max refresh attempts (${MAX_REFRESH_ATTEMPTS}) reached, redirecting to login`);
        refreshAttempts = 0; // Reset counter
        window.location.href = "/signin";
        return Promise.reject(error);
      }

      refreshAttempts++; // Increment attempt counter

      try {
        // 🔥 Refresh token is sent automatically via cookie
        await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        // Reset attempt counter on successful refresh
        refreshAttempts = 0;

        // retry original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        refreshAttempts = 0; // Reset counter on error
        console.error("Token refresh failed:", refreshError);
        // backend already cleared cookies
        window.location.href = "/signin";
      }
    }

    return Promise.reject(error);
  }
);

/* ================= GENERIC AUTH API ================= */
export async function authApi<T>(
  url: string,
  config: AxiosRequestConfig = {}
): Promise<T> {
  const response: AxiosResponse<T> = await axiosInstance({
    url,
    method: config.method || "GET",
    data: config.data,
    params: config.params,
  });

  return response.data;
}
