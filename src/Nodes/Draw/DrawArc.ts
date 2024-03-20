import { IconCircle } from "@tabler/icons-react";
import { createColor, createVector2 } from "../../Types/vectorDataType";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { toP5Color } from "../../Utils/colorUtils";

export const DrawArc: NodeDefinition = {
  id: "DrawArc",
  label: "Draw Arc",
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
      id: "center",
      type: "vector2",
      defaultValue: createVector2(),
    },
    {
      id: "innerRadius",
      type: "number",
      defaultValue: 0,
    },
    {
      id: "outerRadius",
      type: "number",
      defaultValue: 50,
    },
    {
      id: "startAngle",
      type: "number",
      defaultValue: 0,
    },
    {
      id: "angle",
      type: "number",
      defaultValue: 1,
    },
  ],
  dataOutputs: [],
  executeOutputs: [],
  settings: [],
  canBeExecuted: true,
  execute: (data, context) => {
    const color = context.getInputValueColor(data, "color");
    const center = context.getInputValueVector(data, "center");
    const innerRadius = context.getInputValueNumber(data, "innerRadius");
    const outerRadius = context.getInputValueNumber(data, "outerRadius");
    const startAngle = context.getInputValueNumber(data, "startAngle");
    const angle = context.getInputValueNumber(data, "angle");
    context.target.noStroke();
    context.target.fill(toP5Color(color, context.p5));
    context.target.beginShape();
    const count = Math.ceil((angle * 180) / Math.PI);
    for (let i = 0; i <= count; i++) {
      const alpha = (i / count) * angle + startAngle;

      context.target.vertex(center[0] + Math.cos(alpha) * outerRadius, center[1] + Math.sin(alpha) * outerRadius);
    }
    for (let i = 0; i <= count; i++) {
      const alpha = (1 - i / count) * angle + startAngle;
      context.target.vertex(center[0] + Math.cos(alpha) * innerRadius, center[1] + Math.sin(alpha) * innerRadius);
    }
    context.target.endShape();
  },
};
