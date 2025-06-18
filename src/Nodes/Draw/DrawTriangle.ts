import { IconVectorTriangle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { Vector2, createColor, createVector2 } from "../../Types/vectorDataType";
import { toP5Color } from "../../Utils/math/colorUtils";

export const DrawTriangle: NodeDefinition = {
  id: "DrawTriangle",
  label: "Draw Triangle",
  description: "Draw a triangle defined by 3 points",
  icon: IconVectorTriangle,
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
    Port.number("lineWidth", 0),
    Port.bool("fill", true),
  ],
  dataOutputs: [Port.drawing2d("out")],

  settings: [],
  getData(portId, node, context) {
    var color = context.getInputValueColor(node, "color");
    var p1 = context.getInputValueVector(node, "corner1") as Vector2;
    var p2 = context.getInputValueVector(node, "corner2") as Vector2;
    var p3 = context.getInputValueVector(node, "corner3") as Vector2;
    const fill = context.getInputValueBoolean(node, "fill");
    const lineWidth = context.getInputValueNumber(node, "lineWidth");
    return () => {
      if (fill) {
        context.target.fill(toP5Color(color, context.p5));
      }
      if (lineWidth <= 0) {
        context.target.noStroke();
      } else {
        context.target.stroke(toP5Color(color, context.p5));
        context.target.strokeWeight(lineWidth);
      }
      context.target.triangle(...p1, ...p2, ...p3);
      context.target.noFill();
      context.target.noStroke();
    };
  },
};
