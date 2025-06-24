import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { StatefullElementType } from "../Nodes/3D/VirtualNodeTypes/statefullContext";
import { BoundingBox } from "../Types/BoundingBox";
import { getNodesInBoundingBox } from "../Utils/graph/modification/getNodesInBoundingBox";

export type SelectionStore = {
  toggleNode(id: string): void;
  nodes: string[];
  isInSelectionMode: boolean;
  areaStart: [number, number] | null;
  startSelection: ([x, y]: [number, number]) => void;
  endSelection: ([x, y]: [number, number]) => void;
  clear: () => void;
  hasArea: boolean;
  toggleSetMode: (value: boolean | null) => void;

  setSelection(nodes: string[]): void;
};
export const useSelection = create<SelectionStore>()(
  immer((set, get) => {
    return {
      nodes: [],
      isInSelectionMode: false,
      areaStart: null,
      hasArea: false,
      toggleNode(id) {
        if (get().nodes.includes(id)) {
          set((state) => {
            state.nodes = state.nodes.filter((nodeId) => {
              return nodeId !== id;
            });
          });
        } else {
          set((state) => {
            state.nodes.push(id);
          });
        }
      },
      startSelection(start) {
        set((state) => {
          state.areaStart = start;
          state.hasArea = true;
        });
      },
      toggleSetMode(value) {
        if (value === null) {
          value = !get().isInSelectionMode;
        }
        set((state) => {
          state.isInSelectionMode = value as boolean;
          state.nodes = [];
          state.areaStart = [0, 0];
        });
      },
      endSelection(end) {
        var start = get().areaStart;
        if (start == null) {
          return;
        }
        var minX = Math.min(start[0], end[0]);
        var maxX = Math.max(start[0], end[0]);
        var minY = Math.min(start[1], end[1]);
        var maxY = Math.max(start[1], end[1]);
        const nodes = getNodesInBoundingBox(new BoundingBox(minY, maxX, maxY, minX));

        set((state) => {
          state.nodes = nodes;
          state.hasArea = false;
        });
      },
      clear: () => {
        set((state) => {
          state.nodes = [];
          state.hasArea = false;
        });
      },
      setSelection(nodes) {
        set((state) => {
          state.nodes = nodes;
          state.hasArea = false;
        });
      },
    };
  })
);
