import { IconVectorBezier2 } from "@tabler/icons-react";
import { createVector2 } from "../../Types/vectorDataType";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { toP5Color } from "../../Utils/colorUtils";

export const DrawBezier: NodeDefinition = {
  id: "DrawBezier",
  label: "Draw Bezier curve",
  description: "Draw a bezier curve, from start to end, with control point cp1 and cp2",
  icon: IconVectorBezier2,
  tags: ["Draw"],
  dataInputs: [
    {
      id: "color",
      type: "color",
      defaultValue: "#aaaaaa",
    },
    {
      id: "lineWidth",
      type: "number",
      defaultValue: 10,
    },
    {
      id: "start",
      type: "vector2",
      defaultValue: createVector2(100, 200),
    },
    {
      id: "cp1",
      type: "vector2",
      defaultValue: createVector2(200, 100),
    },
    {
      id: "cp2",
      type: "vector2",
      defaultValue: createVector2(200, 300),
    },
    {
      id: "end",
      type: "vector2",
      defaultValue: createVector2(300, 200),
    },
  ],
  dataOutputs: [],
  executeOutputs: [],
  settings: [],
  canBeExecuted: true,
  execute: (data, context) => {
    var color = context.getInputValueColor(data, "color");
    var size = context.getInputValueNumber(data, "lineWidth");
    var start = context.getInputValueVector(data, "start");
    var p1 = context.getInputValueVector(data, "cp1");
    var p2 = context.getInputValueVector(data, "cp2");
    var end = context.getInputValueVector(data, "end");
    context.target.noFill();
    context.target.stroke(toP5Color(color, context.p5));
    context.target.strokeWeight(size);
    context.target.bezier(start[0], start[1], p1[0], p1[1], p2[0], p2[1], end[0], end[1]);
  },
};
