import { IconCircle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createColor, createVector2 } from "../../Types/vectorDataType";
import { toP5Color } from "../../Utils/colorUtils";

export const DrawCircle: NodeDefinition = {
  id: "DrawCircle",
  label: "Draw circle",
  description: "Draw a circle",
  featureLevel: 101,
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
      defaultValue: 10,
    },
  ],
  dataOutputs: [Port.drawing2d("out")],

  settings: [],
  getData(portId, node, context) {
    var color = context.getInputValueColor(node, "color");
    var position = context.getInputValueVector(node, "position");
    var radius = context.getInputValueNumber(node, "radius");
    return () => {
      context.target.noStroke();
      context.target.fill(toP5Color(color, context.p5));
      context.target.circle(position[0], position[1], radius * 2);
    };
  },
};
