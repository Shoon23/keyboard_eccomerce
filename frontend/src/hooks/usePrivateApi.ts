import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import jwt_decode from "jwt-decode";
import { useRefreshToken } from "./useRefreshToken";
import useAuthStore from "../store/authStore";

import { api } from "../utils/axiosBase";

export function usePrivateApi(
  accessToken: string,
  isMultiForm: boolean
): AxiosInstance {
  const headers = isMultiForm
    ? {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      }
    : {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_DOMAIN,
    headers: headers,
    withCredentials: true,
  });
  const addUserDetails = useAuthStore((state) => state.addUserDetails);

  const onRequest = async (config: AxiosRequestConfig): Promise<any> => {
    if (!accessToken) return config;
    const decoded: any = jwt_decode(accessToken);
    const token_expiration = new Date(1000 * decoded?.exp).toLocaleString();
    const current_time = new Date().toLocaleString();

    if (current_time > token_expiration) {
      const user = await useRefreshToken();

      addUserDetails(user);
      config.headers!.Authorization = `Bearer ${user?.accessToken}`;
    }
    return config;
  };
  const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  };

  axios.interceptors.request.use(onRequest, onRequestError);
  return axiosInstance;
}
