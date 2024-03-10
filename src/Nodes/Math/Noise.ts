import { IconGridDots } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { createVector2 } from "../../Data/vectorDataType";

export const Noise: NodeDefinition = {
  id: "Noise",
  tags: ["Math"],
  icon: IconGridDots,
  description: "return a semi random continous value between 0 and 1 for points in 2d. ",
  dataInputs: [
    { id: "pos", type: "vector2", defaultValue: createVector2() },
    { id: "scale", type: "vector2", defaultValue: createVector2(1, 1) },
    { id: "time", type: "number", defaultValue: 0 },
  ],
  dataOutputs: [{ id: "result", type: "number", defaultValue: 0 }],
  executeOutputs: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    if (portId === "result") {
      var pos = context.getInputValueVector(nodeData, "pos");
      var scale = context.getInputValueVector(nodeData, "scale");
      var time = context.getInputValueNumber(nodeData, "time");
      return context.p5.noise(pos[0] * scale[0], pos[1] * scale[1], time);
    }
  },
};
