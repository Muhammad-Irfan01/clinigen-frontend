import axiosInstance from "./axios";
import { AxiosRequestConfig } from "axios";

export async function api<T>(
  endpoint: string,
  options?: AxiosRequestConfig
): Promise<T> {
  const response = await axiosInstance({
    url: endpoint,
    ...options,
  });

  return response.data as T;
}
