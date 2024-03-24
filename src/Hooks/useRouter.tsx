import { create } from "zustand";
import { Routes } from "../Types/Routes";

export type RouterStore = {
  current: Routes;
  close: () => void;
  open: (screen: Routes) => void;
};

export const useRouter = create<RouterStore>()((set) => {
  return {
    current: Routes.Default,
    close() {
      set({ current: Routes.Default });
    },
    open(screen) {
      set({ current: screen });
    },
  };
});
