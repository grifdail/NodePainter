import { IconClock } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";

export const DeltatTime: NodeDefinition = {
  id: "DeltaTime",
  description: "The time since the last frame, in second",
  icon: IconClock,
  tags: ["Input"],
  dataInputs: [],
  dataOutputs: [{ id: "dt", type: "number", defaultValue: 0 }],
  executeOutputs: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    return context.p5.deltaTime / 1000;
  },
};
