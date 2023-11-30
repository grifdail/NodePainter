import { create } from "zustand";

export type Routes = "default" | "node-creation" | "about" | "save" | "load" | "export-gif";

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
