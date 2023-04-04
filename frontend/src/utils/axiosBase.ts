import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_DOMAIN,
  headers: { Accept: "application/json" },
  withCredentials: true,
});

export const apiPrivate = (accessToken: string) => {
  return axios.create({
    baseURL: import.meta.env.VITE_API_DOMAIN,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
};
