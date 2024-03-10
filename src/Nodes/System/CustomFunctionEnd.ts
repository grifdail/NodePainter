import { IconArrowsMove } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";

export const CustomFunctionEnd: NodeDefinition = {
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
    return context._getInputValue(nodeData, portId, "unknown");
  },
  execute: (data, context) => {},
};
