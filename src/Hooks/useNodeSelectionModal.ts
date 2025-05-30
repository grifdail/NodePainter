import { create } from "zustand";

export type NodeSelectionModalStore = {
  targetPosition: [number, number] | null;
  setTargetPosition: (x: number, y: number) => void;
  clear: () => void;
};

export const useNodeSelectionModal = create<NodeSelectionModalStore>()((set) => {
  return {
    targetPosition: null,
    setTargetPosition(x: number, y: number) {
      set({ targetPosition: [x, y] });
    },
    clear() {
      set({ targetPosition: null });
    },
  };
});
