import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { error } from "console";
import Cookies from "js-cookie";

const API_BASE = '';

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
    (response: AxiosResponse) => response,
    (error: AxiosError<any>) => {
        const message = error.response?.data?.message || error.message || "something went wrong";

        return Promise.reject(new Error (message));
    }
)


export default apiClient;