import { IconArrowUpRightCircle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { createVector2 } from "../../Data/vectorDataType";

export const Rotate2D: NodeDefinition = {
  id: "RotateVector",
  description: "Rotate a 2D Vector by a specific radiant",
  icon: IconArrowUpRightCircle,
  tags: ["Vector"],
  dataInputs: [
    {
      id: "vec",
      type: "vector2",
      defaultValue: createVector2(),
    },
    {
      id: "angle",
      type: "number",
      defaultValue: 1,
    },
  ],
  dataOutputs: [
    {
      id: "out",
      type: "vector2",
      defaultValue: createVector2(),
    },
  ],
  executeOutputs: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    var a = context.getInputValueVector(nodeData, "vec");
    var b = context.getInputValueNumber(nodeData, "angle");
    var cos = Math.cos(b);
    var sin = Math.sin(b);
    return createVector2(a[0] * cos + a[1] * sin, a[0] * sin + a[1] * cos);
  },
};
