import { IconArrowsShuffle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";

export const Random: NodeDefinition = {
  id: "Random",
  description: "A random value, consistant across frames",
  icon: IconArrowsShuffle,
  tags: ["Input"],
  dataInputs: [],
  dataOutputs: [{ id: "value", type: "number", defaultValue: 0 }],
  executeOutputs: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    return context.p5.random();
  },
};
