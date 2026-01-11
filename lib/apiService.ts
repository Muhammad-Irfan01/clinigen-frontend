import { AxiosRequestConfig } from "axios";
import { apiClient, publicApiClient, authApiClient } from './axiosConfig';

// Main API function that may redirect on auth failure
export async function api<T>(
    endpoint: string,
    options?: AxiosRequestConfig
): Promise<T> {
    const response = await apiClient({
        url: endpoint,
        ...options
    });

    return response.data as T;
}

// Public API function that doesn't redirect on auth failure
export async function publicApi<T>(
    endpoint: string,
    options?: AxiosRequestConfig
): Promise<T> {
    const response = await publicApiClient({
        url: endpoint,
        ...options
    });

    return response.data as T;
}

// Authenticated API function that doesn't redirect on auth failure
export async function authApi<T>(
    endpoint: string,
    options?: AxiosRequestConfig
): Promise<T> {
    const response = await authApiClient({
        url: endpoint,
        ...options
    });

    return response.data as T;
}