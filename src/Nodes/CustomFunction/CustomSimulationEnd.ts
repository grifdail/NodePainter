import { IconArrowsMove } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const CustomSimulationEnd: NodeDefinition = {
  id: "CustomFunction-end",
  description: "",
  IsUnique: true,
  hideInLibrary: true,
  icon: IconArrowsMove,
  tags: [],
  dataInputs: [],
  dataOutputs: [],
  executeOutputs: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    return context.getInputValue(nodeData, portId, "unknown");
  },
  execute: (data, context) => {},
};
