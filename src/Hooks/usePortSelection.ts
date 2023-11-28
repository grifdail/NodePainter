import { create } from "zustand";
import { PortLocation, PortType } from "../Data/PortType";

export type PortSelection = {
  node: string;
  port: string;
  location: PortLocation;
  type: PortType;
};

export type PortSelectionStore = PortSelection & {
  hasSelection: boolean;
  reset: () => void;
  select: (startNode: string, startPort: string, location: PortLocation, type: PortType) => void;
};

export const usePortSelection = create<PortSelectionStore>()((set) => ({
  hasSelection: false,
  node: "",
  port: "",
  type: "bool",
  location: PortLocation.InputData,
  reset() {
    set((state) => ({ hasSelection: false }));
  },
  select(node, port, location, type) {
    set((state) => ({ hasSelection: true, node, port, location, type }));
  },
}));
