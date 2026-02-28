import axios, { AxiosError } from "axios";

export type ApiError = {
    status: number;
    message: string;
    details?: unknown;
};

export const api = axios.create({
    //baseURL: import.meta.env.VITE_API_URL, // vite
    baseURL: "localhost:7063",
    // for CRA: process.env.REACT_APP_API_URL
    withCredentials: true, // if using httpOnly cookies
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * REQUEST INTERCEPTOR
 * Automatically attach auth token (if using bearer token)
 */
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // adjust if needed

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

/**
 * RESPONSE INTERCEPTOR
 * Normalize errors
 */
api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<any>) => {
        const apiError: ApiError = {
            status: error.response?.status ?? 500,
            message:
                error.response?.data?.message ??
                error.message ??
                "Unexpected error",
            details: error.response?.data,
        };

        return Promise.reject(apiError);
    }
);