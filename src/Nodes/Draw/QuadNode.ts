import { IconPolygon } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createColor, createVector2 } from "../../Types/vectorDataType";
import { toP5Color } from "../../Utils/math/colorUtils";

export const QuadNode: NodeDefinition = {
  id: "Draw/Quad",
  label: "Draw Quad",
  description: "Draw a quad defined by 4 points",
  icon: IconPolygon,
  tags: ["Drawing"],
  dataInputs: [
    {
      id: "color",
      type: "color",
      defaultValue: createColor(),
    },
    {
      id: "corner1",
      type: "vector2",
      defaultValue: createVector2(25, 0),
    },
    {
      id: "corner2",
      type: "vector2",
      defaultValue: createVector2(0, 0),
    },
    {
      id: "corner3",
      type: "vector2",
      defaultValue: createVector2(0, 25),
    },
    {
      id: "corner4",
      type: "vector2",
      defaultValue: createVector2(25, 25),
    },

    Port.number("lineWidth", 0),
    Port.bool("fill", true),
  ],
  dataOutputs: [Port.drawing2d("out")],

  settings: [],
  getData(portId, node, context) {
    var color = context.getInputValueColor(node, "color");
    var p1 = context.getInputValueVector(node, "corner1");
    var p2 = context.getInputValueVector(node, "corner2");
    var p3 = context.getInputValueVector(node, "corner3");
    var p4 = context.getInputValueVector(node, "corner4");
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

      context.target.quad(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1], p4[0], p4[1]);

      context.target.noFill();
      context.target.noStroke();
    };
  },
};
