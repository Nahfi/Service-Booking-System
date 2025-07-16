
import axios from "axios";

import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { getToken } from "../utils/helper";


// export const baseUrl: string | undefined = import.meta.env.VITE_API_BASE_URL;

export const baseUrl: string | undefined = import.meta.env.DEV
    ? "/quick-message-laravel-react/api/user/v1"
    : import.meta.env.VITE_API_BASE_URL;

const MainApi: AxiosInstance = axios.create({
    baseURL: baseUrl,
});

MainApi.interceptors.request.use(
    (config: AxiosRequestConfig): AxiosRequestConfig => {
        let token: string | undefined = undefined;

        if (typeof window !== "undefined") token = getToken();
        if (token)
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            };

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

export default MainApi;
