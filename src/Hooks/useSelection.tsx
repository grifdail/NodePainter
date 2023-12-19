import { create } from "zustand";
import { Vector } from "../Nodes/Vector";

export type SelectionStore = {
  nodes: string[];
  areaStart: Vector | null;
  areaEnd: Vector | null;
  addNode: (nodeId: string) => void;
};

export const useSelection = create<SelectionStore>()((set) => {
  return {
    nodes: [],
    areaStart: null,
    areaEnd: null,
    addNode(nodeId) {},
  };
});
