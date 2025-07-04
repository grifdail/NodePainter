import { IconLine } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createColor, createVector2 } from "../../Types/vectorDataType";
import { toP5Color } from "../../Utils/math/colorUtils";

export const PolylineNode: NodeDefinition = {
  id: "Draw/Polyline",
  description: "Draw a line made of multiple point",
  icon: IconLine,
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
    Port.number("lineWidth", 1),
  ],
  dataOutputs: [Port.drawing2d("out")],

  settings: [],
  getData(portId, node, context) {
    const color = context.getInputValueColor(node, "color");
    const points = context.getInputValueVectorArray(node, "points");
    const lineWidth = context.getInputValueNumber(node, "lineWidth");
    return () => {
      context.target.noFill();
      context.target.stroke(toP5Color(color, context.p5));
      context.target.strokeWeight(lineWidth);
      context.target.beginShape();
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        context.target.vertex(p[0], p[1]);
      }

      context.target.endShape();
      context.target.noFill();
      context.target.noStroke();
    };
  },
};
