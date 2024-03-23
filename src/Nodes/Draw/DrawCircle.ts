import { IconCircle } from "@tabler/icons-react";
import { createColor, createVector2 } from "../../Types/vectorDataType";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { toP5Color } from "../../Utils/colorUtils";

export const DrawCircle: NodeDefinition = {
  id: "DrawCircle",
  label: "Draw circle",
  description: "Draw a circle",
  featureLevel: 5,
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
    context.target.noStroke();
    context.target.fill(toP5Color(color, context.p5));
    context.target.circle(position[0], position[1], radius * 2);
  },
};
