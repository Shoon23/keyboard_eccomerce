import { create } from "zustand";
import { iOrder } from "../types";

type Actions = {
  setOrders: (order: iOrder[]) => void;
};

type State = {
  orders: iOrder[];
};

const initialState: iOrder[] = [];

const useAdminStore = create<State & Actions>()((set) => ({
  orders: initialState,

  setOrders: (order) => set({ orders: order }),
}));

export default useAdminStore;
