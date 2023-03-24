import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import jwt_decode from "jwt-decode";
import { useRefreshToken } from "./useRefreshToken";
import useAuthStore from "../store/authStore";

import { api } from "../utils/axiosBase";

export function useInterceptors(
  axios: AxiosInstance,
  accessToken: string
): AxiosInstance {
  const addUserDetails = useAuthStore((state) => state.addUserDetails);

  const onRequest = async (config: AxiosRequestConfig) => {
    if (!accessToken) return config;
    const decoded: any = jwt_decode(accessToken);
    const token_expiration = new Date(1000 * decoded?.exp).toLocaleString();
    const current_time = new Date().toLocaleString();

    console.log("from the interceptors");
    if (current_time > token_expiration) {
      const user = await useRefreshToken();

      console.log("token refresh");
      addUserDetails(user);
      config.headers!.Authorization = `Bearer ${user?.accessToken}`;
    }
    return config;
  };
  const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  };

  axios.interceptors.request.use(onRequest, onRequestError);
  return axios;
}
