import { IconArrowUpRightCircle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { createVector2, createVector3 } from "../../Data/vectorDataType";

export const FocalLength: NodeDefinition = {
  id: "FocalLength",
  description: "Create a 2D vector based on an Angle and a magnitude",
  icon: IconArrowUpRightCircle,
  tags: ["Vector"],
  dataInputs: [
    {
      id: "position",
      type: "vector3",
      defaultValue: createVector3(),
    },
    {
      id: "focalLength",
      type: "number",
      defaultValue: 400,
    },
  ],
  dataOutputs: [
    { id: "vec", type: "vector2", defaultValue: createVector2() },
    { id: "scale", type: "number", defaultValue: 1 },
  ],
  executeOutputs: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    var position = context.getInputValueVector3(nodeData, "position");
    var focalLength = context.getInputValueNumber(nodeData, "focalLength");
    var coef = (position[2] + focalLength) / focalLength;
    if (portId === "vec") {
      return createVector2(position[0] * coef, position[1] * coef);
    }
    if (portId === "scale") {
      return coef;
    }
  },
};
