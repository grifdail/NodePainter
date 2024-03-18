import { IconRectangle } from "@tabler/icons-react";
import { createColor, createVector2 } from "../../Types/vectorDataType";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { toP5Color } from "../../Utils/colorUtils";

export const DrawRect: NodeDefinition = {
  id: "DrawRect",
  label: "Draw Rect",
  description: "Draw a rectangle starting at the top left corner with a width and height",
  icon: IconRectangle,
  tags: ["Draw"],
  dataInputs: [
    {
      id: "color",
      type: "color",
      defaultValue: createColor(1, 1, 1),
    },
    {
      id: "corner",
      type: "vector2",
      defaultValue: createVector2(10, 10),
    },
    {
      id: "width",
      type: "number",
      defaultValue: 10,
    },
    {
      id: "height",
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
    var p1 = context.getInputValueVector(data, "corner");
    var width = context.getInputValueNumber(data, "width");
    var height = context.getInputValueNumber(data, "height");
    context.target.fill(toP5Color(color, context.p5));
    context.target.noStroke();
    context.target.rect(p1[0], p1[1], width, height);
  },
};
