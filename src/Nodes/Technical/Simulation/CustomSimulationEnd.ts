import { IconArrowsMove } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";

export const CustomSimulationEnd: NodeDefinition = {
  id: "Technical/Simulation/End",
  description: "",
  IsUnique: true,
  hideInLibrary: true,
  icon: IconArrowsMove,
  tags: [],
  dataInputs: [],
  dataOutputs: [],
  preventSnippet: true,
  settings: [],
  getData: (portId, nodeData, context) => {
    return context.getInputValue(nodeData, portId, "unknown");
  },
};
