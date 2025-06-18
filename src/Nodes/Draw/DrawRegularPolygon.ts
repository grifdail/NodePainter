import { IconTriangle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createColor, createVector2 } from "../../Types/vectorDataType";
import { Constraints } from "../../Utils/graph/applyConstraints";
import { toP5Color } from "../../Utils/math/colorUtils";

export const DrawRegularPolygon: NodeDefinition = {
  id: "DrawRegularPolygon",
  label: "Draw Regular Polygon",
  description: "Draw a regular polygon.",
  icon: IconTriangle,
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
      id: "radius",
      type: "number",
      defaultValue: 100,
    },
    {
      id: "side",
      type: "number",
      defaultValue: 3,
      constrains: [Constraints.Integer(), Constraints.GreaterThan(3)],
    },
    {
      id: "offset",
      type: "number",
      defaultValue: 0,
    },
    Port.number("lineWidth", 0),
    Port.bool("fill", true),
  ],
  dataOutputs: [Port.drawing2d("out")],

  settings: [],
  getData(portId, node, context) {
    const color = context.getInputValueColor(node, "color");
    const center = context.getInputValueVector(node, "center");
    const radius = context.getInputValueNumber(node, "radius");
    const side = context.getInputValueNumber(node, "side");
    const offset = context.getInputValueNumber(node, "offset");
    const fill = context.getInputValueBoolean(node, "fill");
    const lineWidth = context.getInputValueNumber(node, "lineWidth");
    return () => {
      console.log("aaaa");
      if (fill) {
        context.target.fill(toP5Color(color, context.p5));
      }
      if (lineWidth <= 0) {
        context.target.noStroke();
      } else {
        context.target.stroke(toP5Color(color, context.p5));
        context.target.strokeWeight(lineWidth);
      }
      context.target.beginShape();
      console.log("side" + side);
      for (let i = 0; i < side; i++) {
        const alpha = (i / side + offset) * Math.PI * 2;

        context.target.vertex(center[0] + Math.cos(alpha) * radius, center[1] + Math.sin(alpha) * radius);
      }
      context.target.endShape();
      context.target.noFill();
      context.target.noStroke();
    };
  },
};
