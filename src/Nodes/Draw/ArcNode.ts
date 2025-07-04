import { IconCircle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createColor, createVector2 } from "../../Types/vectorDataType";
import { toP5Color } from "../../Utils/math/colorUtils";

export const ArcNode: NodeDefinition = {
  id: "Draw/Arc",
  label: "Draw Arc",
  description: "Draw the contour of a circle.",
  icon: IconCircle,
  tags: ["Drawing"],
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
    Port.bool("fill", true),
    Port.number("lineWidth", 0),
  ],
  dataOutputs: [Port.drawing2d("out")],

  settings: [],
  getData(portId, node, context) {
    const color = context.getInputValueColor(node, "color");
    const center = context.getInputValueVector(node, "center");
    const innerRadius = context.getInputValueNumber(node, "innerRadius");
    const outerRadius = context.getInputValueNumber(node, "outerRadius");
    const startAngle = context.getInputValueNumber(node, "startAngle");
    const angle = context.getInputValueNumber(node, "angle");
    const fill = context.getInputValueBoolean(node, "fill");
    const lineWidth = context.getInputValueNumber(node, "lineWidth");
    return () => {
      if (fill) {
        context.target.fill(toP5Color(color, context.p5));
      } else {
        context.target.noFill();
      }
      if (lineWidth <= 0) {
        context.target.noStroke();
      } else {
        context.target.stroke(toP5Color(color, context.p5));
        context.target.strokeWeight(lineWidth);
      }

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
      context.target.noFill();
      context.target.noStroke();
    };
  },
};
