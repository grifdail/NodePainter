import { IconVectorTriangle } from "@tabler/icons-react";
import { createColor, createVector2 } from "../../Data/vectorDataType";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { toP5Color } from "../../Data/colorUtils";

export const DrawTriangle: NodeDefinition = {
  id: "DrawTriangle",
  description: "Draw a triangle defined by 3 points",
  icon: IconVectorTriangle,
  tags: ["Draw"],
  dataInputs: [
    {
      id: "color",
      type: "color",
      defaultValue: createColor(),
    },
    {
      id: "corner1",
      type: "vector2",
      defaultValue: createVector2(25, 0),
    },
    {
      id: "corner2",
      type: "vector2",
      defaultValue: createVector2(0, 0),
    },
    {
      id: "corner3",
      type: "vector2",
      defaultValue: createVector2(0, 25),
    },
  ],
  dataOutputs: [],
  executeOutputs: [],
  settings: [],
  canBeExecuted: true,
  execute: (data, context) => {
    var color = context.getInputValueColor(data, "color");
    var p1 = context.getInputValueVector(data, "corner1");
    var p2 = context.getInputValueVector(data, "corner2");
    var p3 = context.getInputValueVector(data, "corner3");
    context.target.fill(toP5Color(color, context.p5));
    context.target.noStroke();
    context.target.triangle(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
  },
};
