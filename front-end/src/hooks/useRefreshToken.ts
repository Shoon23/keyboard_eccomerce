import { api } from "../utils/axiosBase";

export async function useRefreshToken() {
  try {
    const res = await api.get("/auth/refreshToken");
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
