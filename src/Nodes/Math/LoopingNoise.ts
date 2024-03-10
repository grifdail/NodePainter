import { IconGridDots } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { createVector2 } from "../../Data/vectorDataType";

export const LoopingNoise: NodeDefinition = {
  id: "LoopingNoise",
  tags: ["Math"],
  icon: IconGridDots,
  description: "return a semi random continous value between 0 and 1, looping around when in the interval [0,1] .",
  dataInputs: [
    { id: "pos", type: "number", defaultValue: 0 },
    { id: "scale", type: "number", defaultValue: 1 },
    { id: "seed", type: "vector2", defaultValue: createVector2(0, 0) },
  ],
  dataOutputs: [{ id: "result", type: "number", defaultValue: 0 }],
  executeOutputs: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    var pos = context.getInputValueNumber(nodeData, "pos");
    var scale = context.getInputValueNumber(nodeData, "scale");
    var seed = context.getInputValueVector(nodeData, "seed");
    return context.p5.noise(seed[0] + Math.cos(pos * Math.PI * 2) * scale, seed[0] + Math.cos(pos * Math.PI * 2) * scale);
  },
};
