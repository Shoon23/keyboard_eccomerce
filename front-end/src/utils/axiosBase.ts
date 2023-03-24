import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: { Accept: "application/json" },
  withCredentials: true,
});

export const apiPrivate = (accessToken: string) => {
  return axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
};
