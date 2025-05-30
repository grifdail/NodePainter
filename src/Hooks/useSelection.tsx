import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useTree } from "./useTree";
import { GetNodeHeight } from "../Components/Graph/GetNodeHeight";
import { NODE_WIDTH } from "../Components/Graph/NodeVisualConst";

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
        const tree = useTree.getState();
        const nodes = Object.values(tree.nodes)
          .filter((node) => {
            if (node.positionX + NODE_WIDTH < minX || node.positionX > maxX || node.positionY > maxY) {
              return false;
            }
            var nodeHeight = GetNodeHeight(node, tree.getNodeTypeDefinition(node));
            return !(node.positionY + nodeHeight < minY);
          })
          .map((node) => node.id);

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
    };
  })
);
