import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'; // Update this to your backend URL

// Main axios instance with redirect behavior
const apiClient: AxiosInstance = axios.create({
    baseURL : API_BASE,
    withCredentials: true,
    headers : {
        "Content-Type" : "application/json"
    },
});

// Axios instance for public endpoints (no redirect)
const publicApiClient: AxiosInstance = axios.create({
    baseURL : API_BASE,
    withCredentials: true,
    headers : {
        "Content-Type" : "application/json"
    },
});

// Axios instance for authenticated endpoints (no redirect)
const authApiClient: AxiosInstance = axios.create({
    baseURL : API_BASE,
    withCredentials: true,
    headers : {
        "Content-Type" : "application/json"
    },
});

// Track refresh attempts to prevent infinite loops
let refreshAttempts = 0;
const MAX_REFRESH_ATTEMPTS = 3;

// Add request interceptors to all instances
const addRequestInterceptors = (client: AxiosInstance) => {
    client.interceptors.request.use(
        (config) => {
            const token = Cookies.get("accessToken");

            if(token) {
                config.headers!.Authorization = `Bearer ${token}`;
                // Only log in development to avoid exposing token info
                if (process.env.NODE_ENV === 'development') {
                    console.log("Authorization header set:", `Bearer ${token.substring(0, 10)}...`); // Log first 10 chars for security
                }
            } else {
                if (process.env.NODE_ENV === 'development') {
                    console.log("No access token found in cookies");
                }
            }
            return config;
        },
        (error) => {
            if (process.env.NODE_ENV === 'development') {
                console.error("Request interceptor error:", error);
            }
            return Promise.reject(error);
        }
    );
};

addRequestInterceptors(apiClient);
addRequestInterceptors(publicApiClient);

// Add request interceptor to authApiClient separately to avoid duplication
authApiClient.interceptors.request.use(
    (config) => {
        const token = Cookies.get("accessToken");

        if(token) {
            config.headers!.Authorization = `Bearer ${token}`;
            // Only log in development to avoid exposing token info
            if (process.env.NODE_ENV === 'development') {
                console.log("Auth API Authorization header set:", `Bearer ${token.substring(0, 10)}...`); // Log first 10 chars for security
            }
        } else {
            if (process.env.NODE_ENV === 'development') {
                console.log("No access token found in cookies for auth API");
            }
        }
        return config;
    },
    (error) => {
        if (process.env.NODE_ENV === 'development') {
            console.error("Auth API Request interceptor error:", error);
        }
        return Promise.reject(error);
    }
);

// Add response interceptor with refresh token behavior to authApiClient
authApiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (process.env.NODE_ENV === 'development') {
            console.log("Auth API 401 error detected:", error.response?.status);
        }

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            if (process.env.NODE_ENV === 'development') {
                console.log("Attempting to refresh token for auth API...");
            }

            // Prevent infinite refresh attempts
            if (refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
                if (process.env.NODE_ENV === 'development') {
                    console.log(`Max refresh attempts (${MAX_REFRESH_ATTEMPTS}) reached, clearing tokens`);
                }

                Cookies.remove("accessToken");
                Cookies.remove("refreshToken");
                refreshAttempts = 0; // Reset counter
                return Promise.reject(error);
            }

            try {
                const refreshToken = Cookies.get("refreshToken");

                if (process.env.NODE_ENV === 'development') {
                    console.log("Refresh token found:", !!refreshToken);
                }

                if (!refreshToken) {
                    if (process.env.NODE_ENV === 'development') {
                        console.log("No refresh token available, clearing auth tokens and rejecting request");
                    }

                    Cookies.remove("accessToken");
                    Cookies.remove("refreshToken");
                    refreshAttempts = 0; // Reset counter
                    // Don't redirect here since this is for API calls
                    return Promise.reject(error);
                }

                refreshAttempts++; // Increment attempt counter
                const refreshResponse = await apiClient.post("/auth/refresh", {
                    refreshToken: refreshToken
                });

                if (process.env.NODE_ENV === 'development') {
                    console.log("Token refresh successful");
                }

                // Reset attempt counter on successful refresh
                refreshAttempts = 0;

                Cookies.set("accessToken", refreshResponse.data.accessToken);
                Cookies.set("refreshToken", refreshResponse.data.refreshToken);

                originalRequest.headers.Authorization =
                    `Bearer ${refreshResponse.data.accessToken}`;

                return authApiClient(originalRequest);
            } catch (refreshError) {
                refreshAttempts = 0; // Reset counter on error

                if (process.env.NODE_ENV === 'development') {
                    console.error("Token refresh failed:", refreshError);
                }

                Cookies.remove("accessToken");
                Cookies.remove("refreshToken");
                // Don't redirect here since this is for API calls
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

// Add response interceptor with redirect behavior only to main instance
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (process.env.NODE_ENV === 'development') {
            console.log("Main API 401 error detected:", error.response?.status);
        }

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            if (process.env.NODE_ENV === 'development') {
                console.log("Attempting to refresh token for main API...");
            }

            // Prevent infinite refresh attempts
            if (refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
                if (process.env.NODE_ENV === 'development') {
                    console.log(`Max refresh attempts (${MAX_REFRESH_ATTEMPTS}) reached, clearing tokens and redirecting to login`);
                }

                Cookies.remove("accessToken");
                Cookies.remove("refreshToken");
                refreshAttempts = 0; // Reset counter
                window.location.href = "/signin";
                return Promise.reject(error);
            }

            try {
                const refreshToken = Cookies.get("refreshToken");

                if (process.env.NODE_ENV === 'development') {
                    console.log("Refresh token found for main API:", !!refreshToken);
                }

                if (!refreshToken) {
                    if (process.env.NODE_ENV === 'development') {
                        console.log("No refresh token available, clearing auth tokens and redirecting to login");
                    }

                    Cookies.remove("accessToken");
                    Cookies.remove("refreshToken");
                    refreshAttempts = 0; // Reset counter
                    window.location.href = "/signin";
                    return Promise.reject(error);
                }

                refreshAttempts++; // Increment attempt counter
                const refreshResponse = await apiClient.post("/auth/refresh", {
                    refreshToken: refreshToken
                });

                if (process.env.NODE_ENV === 'development') {
                    console.log("Main API token refresh successful");
                }

                // Reset attempt counter on successful refresh
                refreshAttempts = 0;

                Cookies.set("accessToken", refreshResponse.data.accessToken);
                Cookies.set("refreshToken", refreshResponse.data.refreshToken);

                originalRequest.headers.Authorization =
                    `Bearer ${refreshResponse.data.accessToken}`;

                return apiClient(originalRequest);
            } catch (refreshError) {
                refreshAttempts = 0; // Reset counter on error

                if (process.env.NODE_ENV === 'development') {
                    console.error("Main API token refresh failed:", refreshError);
                }

                Cookies.remove("accessToken");
                Cookies.remove("refreshToken");
                window.location.href = "/signin";
            }
        }

        return Promise.reject(error);
    }
);

// Export all instances
export { apiClient, publicApiClient, authApiClient };