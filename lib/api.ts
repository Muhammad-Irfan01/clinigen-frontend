import { AxiosRequestConfig } from "axios";
import apiClient from "./axios";

const API_BASE = '';

export async function api<T> (
    endpoint: string,
    options?: AxiosRequestConfig
): Promise<T> {
    const response = await apiClient({
        url: endpoint,
        ...options
    })

    return response.data as T;
}