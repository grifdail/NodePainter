import { IconArrowsMove } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const CustomSimulationStart: NodeDefinition = {
  id: "CustomSimulation-start",
  description: "",
  IsUnique: true,
  icon: IconArrowsMove,
  tags: [],
  hideInLibrary: true,
  dataInputs: [],
  dataOutputs: [],
  executeOutputs: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    var contextFn = context.functionStack[context.functionStack.length - 1];
    return contextFn[portId];
  },
  execute: (data, context) => {},
};
