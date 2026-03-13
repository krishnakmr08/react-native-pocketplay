import axios from "axios";
import { BASE_URL } from "./config";
import { tokenStorage } from "./storage";

export const appAxios = axios.create({
  baseURL: BASE_URL,
});

export const refresh_tokens = async (): Promise<boolean> => {
  try {
    const refreshToken = tokenStorage.getString("refreshToken");

    if (!refreshToken) return false;

    const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
      refresh_token: refreshToken,
    });

    const { access_token, refresh_token } = response.data;

    if (!access_token || !refresh_token) return false;

    tokenStorage.set("accessToken", access_token);
    tokenStorage.set("refreshToken", refresh_token);
    return true;
  } catch (error) {
    console.log("REFRESH TOKEN ERROR:", error);
    tokenStorage.clearAll();
    return false;
  }
};

appAxios.interceptors.request.use((config) => {
  const accessToken = tokenStorage.getString("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

appAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshed = await refresh_tokens();

      if (refreshed) {
        const newAccessToken = tokenStorage.getString("accessToken");

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return appAxios(originalRequest);
      }
    }

    return Promise.reject(error);
  },
);
