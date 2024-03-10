import { IconCircle } from "@tabler/icons-react";
import { createColor, createVector2 } from "../../Data/vectorDataType";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { toP5Color } from "../../Data/colorUtils";

export const DrawCircleStroke: NodeDefinition = {
  id: "DrawCircleStroke",
  description: "Draw the contour of a circle.",
  icon: IconCircle,
  tags: ["Draw"],
  dataInputs: [
    {
      id: "color",
      type: "color",
      defaultValue: createColor(1, 1, 1),
    },
    {
      id: "position",
      type: "vector2",
      defaultValue: createVector2(),
    },
    {
      id: "radius",
      type: "number",
      defaultValue: 20,
    },
    {
      id: "lineWidth",
      type: "number",
      defaultValue: 10,
    },
  ],
  dataOutputs: [],
  executeOutputs: [],
  settings: [],
  canBeExecuted: true,
  execute: (data, context) => {
    var color = context.getInputValueColor(data, "color");
    var position = context.getInputValueVector(data, "position");
    var radius = context.getInputValueNumber(data, "radius");
    var lineWidth = context.getInputValueNumber(data, "lineWidth");
    context.target.stroke(toP5Color(color, context.p5));
    context.target.noFill();
    context.target.strokeWeight(lineWidth);
    context.target.circle(position[0], position[1], radius);
  },
};
