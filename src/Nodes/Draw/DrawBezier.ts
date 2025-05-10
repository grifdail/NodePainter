import { IconVectorBezier2 } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Vector3, createVector2 } from "../../Types/vectorDataType";
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
    const color = context.getInputValueColor(data, "color");
    const size = context.getInputValueNumber(data, "lineWidth");
    const start = context.getInputValueVector(data, "start") as Vector3;
    const p1 = context.getInputValueVector(data, "cp1") as Vector3;
    const p2 = context.getInputValueVector(data, "cp2") as Vector3;
    const end = context.getInputValueVector(data, "end") as Vector3;
    context.target.noFill();
    context.target.stroke(toP5Color(color, context.p5));
    context.target.strokeWeight(size);
    context.target.bezier(...start, ...p1, ...p2, ...end);
  },
};
