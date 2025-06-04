
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import { getToken } from "../utils/helper";

export const baseUrl: string | undefined = import.meta.env.API_BASE_URL;

const api: AxiosInstance = axios.create({
  baseURL: baseUrl,
});

api.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    let token: string | undefined = undefined;

    if (typeof window !== "undefined") token = getToken();
    if (token)
      config.headers = { ...config.headers, Authorization: `Bearer ${token}` };

    config.headers = {
      ...config.headers,
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (config.data instanceof FormData)
    config.headers["Content-Type"] = "multipart/form-data";
    
    return config;
  }
);

export default api;
