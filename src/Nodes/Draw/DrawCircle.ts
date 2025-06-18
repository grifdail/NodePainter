import { IconCircle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createColor, createVector2 } from "../../Types/vectorDataType";
import { toP5Color } from "../../Utils/math/colorUtils";

export const DrawCircle: NodeDefinition = {
  id: "DrawCircle",
  label: "Draw circle",
  description: "Draw a circle",
  featureLevel: 101,
  icon: IconCircle,
  tags: ["Drawing"],
  dataInputs: [
    {
      id: "color",
      type: "color",
      defaultValue: createColor(1, 1, 1),
    },
    {
      id: "position",
      type: "vector2",
      defaultValue: createVector2(),
    },
    {
      id: "radius",
      type: "number",
      defaultValue: 10,
    },
    Port.bool("fill", true),
    Port.number("lineWidth", 0),
  ],
  dataOutputs: [Port.drawing2d("out")],

  settings: [],
  getData(portId, node, context) {
    var color = context.getInputValueColor(node, "color");
    var position = context.getInputValueVector(node, "position");
    var radius = context.getInputValueNumber(node, "radius");
    var fill = context.getInputValueBoolean(node, "fill");
    var lineWidth = context.getInputValueNumber(node, "lineWidth");
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

      context.target.circle(position[0], position[1], radius * 2);
      context.target.noFill();
      context.target.noStroke();
    };
  },
};
