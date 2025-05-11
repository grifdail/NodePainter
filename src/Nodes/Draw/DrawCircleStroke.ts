import { IconCircle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createColor, createVector2 } from "../../Types/vectorDataType";
import { toP5Color } from "../../Utils/colorUtils";

export const DrawCircleStroke: NodeDefinition = {
  id: "DrawCircleStroke",
  label: "Draw Circle Stroke",
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
      id: "position",
      type: "vector2",
      defaultValue: createVector2(),
    },
    {
      id: "radius",
      type: "number",
      defaultValue: 20,
    },
    {
      id: "lineWidth",
      type: "number",
      defaultValue: 10,
    },
  ],
  dataOutputs: [Port.drawing2d("out")],

  settings: [],
  getData(portId, node, context) {
    var color = context.getInputValueColor(node, "color");
    var position = context.getInputValueVector(node, "position");
    var radius = context.getInputValueNumber(node, "radius");
    var lineWidth = context.getInputValueNumber(node, "lineWidth");
    return () => {
      context.target.stroke(toP5Color(color, context.p5));
      context.target.noFill();
      context.target.strokeWeight(lineWidth);
      context.target.circle(position[0], position[1], radius);
    };
  },
};
