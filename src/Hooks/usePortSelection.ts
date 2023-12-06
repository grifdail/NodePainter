import { create } from "zustand";
import { PortType } from "../Data/NodeDefinition";
import { PortRole } from "../Data/NodeDefinition";

export type PortSelection = {
  node: string;
  port: string;
  location: PortRole;
  type: PortType;
};

export type PortSelectionStore = PortSelection & {
  hasSelection: boolean;
  reset: () => void;
  select: (startNode: string, startPort: string, location: PortRole, type: PortType) => void;
};

export const usePortSelection = create<PortSelectionStore>()((set) => ({
  hasSelection: false,
  node: "",
  port: "",
  type: "bool",
  location: "inputData",
  reset() {
    set((state) => ({ hasSelection: false }));
  },
  select(node, port, location, type) {
    set((state) => ({ hasSelection: true, node, port, location, type }));
  },
}));
