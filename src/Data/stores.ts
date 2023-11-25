import { create } from "zustand";

export type Viewbox = {
  x: number;
  y: number;
  scale: number;
  set: (x: number, y: number, s: number) => void;
};

export const useViewbox = create<Viewbox>()((set) => ({
  x: 0,
  y: 0,
  scale: 1,
  set: (x, y, scale) => set((state) => ({ x, y, scale })),
}));
