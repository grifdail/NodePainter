import { IconAssembly } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
export const START_NODE = "Start";

export const StartNode: NodeDefinition = {
  id: START_NODE,
  description: "The start of the program",
  icon: IconAssembly,
  tags: ["Control"],
  dataInputs: [],
  hideInLibrary: true,
  dataOutputs: [],
  executeOutputs: ["execute"],
  settings: [
    { id: "width", type: "number", defaultValue: 400 },
    { id: "height", type: "number", defaultValue: 400 },
  ],
  canBeExecuted: true,
  execute: (data, context) => {
    if (data.execOutputs.execute) {
      context.execute(data.execOutputs.execute);
    }
  },
  IsUnique: true,
};
