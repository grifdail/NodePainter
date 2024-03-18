import { create } from "zustand";
import { ViewboxStore } from "../Types/ViewboxStore";

export const useViewbox = create<ViewboxStore>()((set) => ({
  x: 0,
  y: 0,
  scale: 1,
  set: (x, y, scale) => set((state) => ({ x, y, scale })),
}));
