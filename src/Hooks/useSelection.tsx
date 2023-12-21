import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useTree } from "./useTree";
import { GetNodeHeight } from "../Components/Graph/GraphNode";

export type SelectionStore = {
  toggleNode(id: string): void;
  nodes: string[];
  isInSelectionMode: boolean;
  areaStart: [number, number] | null;
  startSelection: ([x, y]: [number, number]) => void;
  endSelection: ([x, y]: [number, number]) => void;
  clear: () => void;
  toggleSetMode: (value: boolean | null) => void;
};
export const useSelection = create<SelectionStore>()(
  immer((set, get) => {
    return {
      nodes: [],
      isInSelectionMode: false,
      areaStart: null,
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
        });
      },
      toggleSetMode(value) {
        if (value === null) {
          value = !get().isInSelectionMode;
        }
        set((state) => {
          state.isInSelectionMode = value as boolean;
          state.nodes = [];
          state.areaStart = null;
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
        const tree = useTree.getState();
        const nodes = Object.values(tree.nodes)
          .filter((node) => {
            if (node.positionX + 300 < minX || node.positionX > maxX || node.positionY > maxY) {
              return false;
            }
            var nodeHeight = GetNodeHeight(node, tree.getNodeTypeDefinition(node));
            return !(node.positionY + nodeHeight < minY);
          })
          .map((node) => node.id);

        set((state) => {
          state.nodes = nodes;
        });
      },
      clear: () => {
        set((state) => {
          state.nodes = [];
        });
      },
    };
  })
);
