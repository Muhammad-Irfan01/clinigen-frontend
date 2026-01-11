import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'; // Update this to your backend URL

const apiClient: AxiosInstance = axios.create({
    baseURL : API_BASE,
    withCredentials: true,
    headers : {
        "Content-Type" : "application/json"
    },
});

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = Cookies.get("accessToken");

        if(token) {
            config.headers!.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)

);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await apiClient.post("/auth/refresh");

        Cookies.set("accessToken", refreshResponse.data.accessToken);
        Cookies.set("refreshToken", refreshResponse.data.refreshToken);

        originalRequest.headers.Authorization =
          `Bearer ${refreshResponse.data.accessToken}`;

        return apiClient(originalRequest);
      } catch {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        window.location.href = "/signin";
      }
    }

    return Promise.reject(error);
  }
);


export default apiClient;