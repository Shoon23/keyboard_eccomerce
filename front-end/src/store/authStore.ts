import { create } from "zustand";
import { iUser as State } from "../types";

type Actions = {
  addUserDetails: (userDetails: State) => void;
  clearUserDetails: () => void;
};

const initialState = {
  userId: "",
  firstName: "",
  lastName: "",
  email: "",
  createdAt: "",
  cartId: "",
  accessToken: "",
  favoritesId: "",
};

const useAuthStore = create<State & Actions>()((set) => ({
  ...initialState,
  addUserDetails: (userDetails) => set({ ...userDetails }),
  clearUserDetails: () => set(initialState),
}));

export default useAuthStore;
