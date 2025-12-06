import { IconClock } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const DeltatTimeNode: NodeDefinition = {
  id: "Input/DeltaTime",
  description: "The time since the last frame, in second",
  icon: IconClock,
  tags: ["Input"],
  dataInputs: [],
  dataOutputs: [{ id: "dt", type: "number", defaultValue: 0 }],

  settings: [],
  getData: (portId, nodeData, context) => {
    return context.deltaTime;
  },
};
