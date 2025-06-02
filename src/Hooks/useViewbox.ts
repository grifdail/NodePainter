import { create } from "zustand";
import { ViewboxStore } from "../Types/ViewboxStore";

export const useViewbox = create<ViewboxStore>()((set, get) => ({
  x: 0,
  y: 0,
  scale: 1,
  set: (x, y, scale) => set((state) => ({ x, y, scale })),
  center: () => {
    var view = get();
    return [view.x + window.innerWidth * 0.5 * view.scale, view.y + window.innerHeight * 0.5 * view.scale];
  },
}));
