import { create } from "zustand";

export type ViewboxStore = {
  x: number;
  y: number;
  scale: number;
  set: (x: number, y: number, s: number) => void;
};

export const useViewbox = create<ViewboxStore>()((set) => ({
  x: 0,
  y: 0,
  scale: 1,
  set: (x, y, scale) => set((state) => ({ x, y, scale })),
}));
