import { IconArrowUpRightCircle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { genShader } from "../../Data/genShader";
import { createVector2 } from "../../Data/vectorDataType";

export const VectorFromAngle: NodeDefinition = {
  id: "VectorFromAngle",
  description: "Create a 2D vector based on an Angle and a magnitude",
  icon: IconArrowUpRightCircle,
  tags: ["Vector"],
  dataInputs: [
    {
      id: "angle",
      type: "number",
      defaultValue: 0,
    },
    {
      id: "length",
      type: "number",
      defaultValue: 1,
    },
  ],
  dataOutputs: [{ id: "vec", type: "vector2", defaultValue: createVector2() }],
  executeOutputs: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    if (portId === "vec") {
      var angle = context.getInputValueNumber(nodeData, "angle");
      var length = context.getInputValueNumber(nodeData, "length");
      return createVector2(Math.cos(angle) * length, Math.sin(angle) * length);
    }
  },
  getShaderCode(node, context) {
    return genShader(node, context, "vec", ["angle", "length"], ({ angle, length }) => `vec2(cos(${angle}) * ${length}, sin(${angle}) * ${length})`);
  },
};
