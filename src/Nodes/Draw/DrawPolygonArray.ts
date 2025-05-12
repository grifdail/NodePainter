import { IconPolygon } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createColor, createVector2 } from "../../Types/vectorDataType";
import { toP5Color } from "../../Utils/colorUtils";

export const DrawPolygonArray: NodeDefinition = {
  id: "DrawPolygonArray",
  label: "Draw Polygon Array",
  description: "Draw a polygon based on a array of points",
  icon: IconPolygon,
  tags: ["Draw"],
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
  ],
  dataOutputs: [Port.drawing2d("out")],

  settings: [],
  getData(portId, node, context) {
    const color = context.getInputValueColor(node, "color");
    const points = context.getInputValueVectorArray(node, "points");
    return () => {
      context.target.fill(toP5Color(color, context.p5));
      context.target.noStroke();
      context.target.beginShape();
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        context.target.vertex(p[0], p[1]);
      }
      context.target.endShape();
    };
  },
};
