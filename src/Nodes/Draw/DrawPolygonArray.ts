import { IconPolygon } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createColor, createVector2 } from "../../Types/vectorDataType";
import { toP5Color } from "../../Utils/math/colorUtils";

export const DrawPolygon: NodeDefinition = {
  id: "Draw/Polygon",
  label: "Draw Polygon",
  description: "Draw a polygon based on a array of points",
  icon: IconPolygon,
  tags: ["Drawing"],
  dataInputs: [
    {
      id: "color",
      type: "color",
      defaultValue: createColor(),
    },
    {
      id: "points",
      type: "array-vector2",
      defaultValue: [createVector2(25, 0), createVector2(0, 0), createVector2(0, 25)],
    },
    Port.number("lineWidth", 0),
    Port.bool("fill", true),
  ],
  dataOutputs: [Port.drawing2d("out")],

  settings: [],
  getData(portId, node, context) {
    const color = context.getInputValueColor(node, "color");
    const points = context.getInputValueVectorArray(node, "points");
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
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        context.target.vertex(p[0], p[1]);
      }

      context.target.endShape(context.target.CLOSE);
      context.target.noFill();
      context.target.noStroke();
    };
  },
};
