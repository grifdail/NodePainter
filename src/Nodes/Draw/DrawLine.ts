import { IconLine } from "@tabler/icons-react";
import { createColor, createVector2 } from "../../Data/vectorDataType";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { toP5Color } from "../../Data/colorUtils";

export const DrawLine: NodeDefinition = {
  id: "DrawLine",
  description: "Draw a line between two point",
  icon: IconLine,
  tags: ["Draw"],
  dataInputs: [
    {
      id: "color",
      type: "color",
      defaultValue: createColor(1, 1, 1),
    },
    {
      id: "start",
      type: "vector2",
      defaultValue: createVector2(10, 10),
    },
    {
      id: "end",
      type: "vector2",
      defaultValue: createVector2(90, 90),
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
    var p1 = context.getInputValueVector(data, "start");
    var p2 = context.getInputValueVector(data, "end");
    var lineWidth = context.getInputValueNumber(data, "lineWidth");
    context.target.stroke(toP5Color(color, context.p5));
    context.target.strokeWeight(lineWidth);
    context.target.line(p1[0], p1[1], p2[0], p2[1]);
  },
};
