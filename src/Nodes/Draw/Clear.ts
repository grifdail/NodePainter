import { IconBucketDroplet } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const Clear: NodeDefinition = {
  id: "Clear",
  description: "Clear the entire canvas",
  icon: IconBucketDroplet,
  tags: ["Draw"],
  dataInputs: [],
  dataOutputs: [],
  executeOutputs: [],
  settings: [],
  canBeExecuted: true,
  execute: (data, context) => {
    context.target.clear(0, 0, 0, 0);
  },
};
