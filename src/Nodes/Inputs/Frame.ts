import { IconFrame } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";

export const Frame: NodeDefinition = {
  id: "Frame",
  description: "The current frame index relative to the execution of the preview",
  icon: IconFrame,
  tags: ["Input"],
  dataInputs: [],
  dataOutputs: [{ id: "frame", type: "number", defaultValue: 0 }],
  executeOutputs: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    return context.p5.frameCount;
  },
};
