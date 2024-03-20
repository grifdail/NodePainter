import { create } from "zustand";
import { Routes } from "../Types/Routes";

export type RouterStore = {
  current: Routes;
  close: () => void;
  open: (screen: Routes) => void;
};

export const useRouter = create<RouterStore>()((set) => {
  return {
    current: "default",
    close() {
      set({ current: "default" });
    },
    open(screen) {
      set({ current: screen });
    },
  };
});
