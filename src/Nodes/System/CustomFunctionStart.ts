import { IconArrowsMove } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";

export const CustomFunctionStart: NodeDefinition = {
  id: "CustomFunction-start",
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
  execute: (data, context) => {
    if (data.execOutputs.execute) {
      context.execute(data.execOutputs.execute);
    }
  },
};