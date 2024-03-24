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
    { id: "name", type: "string", defaultValue: "sketch" },
    { id: "width", type: "number", defaultValue: 400 },
    { id: "height", type: "number", defaultValue: 400 },
  ],
  canBeExecuted: false,
  execute: (data, context) => {
    if (data.execOutputs.execute) {
      context.execute(data.execOutputs.execute);
    }
  },
  IsUnique: true,
};
