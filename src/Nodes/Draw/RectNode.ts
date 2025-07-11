import { IconRectangle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createColor, createVector2 } from "../../Types/vectorDataType";
import { toP5Color } from "../../Utils/math/colorUtils";

export const RectNode: NodeDefinition = {
  id: "Draw/Rect",
  label: "Draw Rect",
  alias: "Square",
  description: "Draw a rectangle starting at the top left corner with a width and height",
  icon: IconRectangle,
  tags: ["Drawing"],
  dataInputs: [
    {
      id: "color",
      type: "color",
      defaultValue: createColor(1, 1, 1),
    },
    {
      id: "corner",
      type: "vector2",
      defaultValue: createVector2(10, 10),
    },
    {
      id: "width",
      type: "number",
      defaultValue: 10,
    },
    {
      id: "height",
      type: "number",
      defaultValue: 10,
    },
    Port.number("lineWidth", 0),
    Port.bool("fill", true),
    Port.number("cornerRadius", 0),
  ],
  dataOutputs: [Port.drawing2d("out")],

  settings: [],
  getData(portId, node, context) {
    var color = context.getInputValueColor(node, "color");
    var p1 = context.getInputValueVector(node, "corner");
    var width = context.getInputValueNumber(node, "width");
    var height = context.getInputValueNumber(node, "height");
    const fill = context.getInputValueBoolean(node, "fill");
    const lineWidth = context.getInputValueNumber(node, "lineWidth");
    const cornerRadius = context.getInputValueNumber(node, "cornerRadius");
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
      context.target.rect(p1[0], p1[1], width, height, cornerRadius, cornerRadius, cornerRadius, cornerRadius);
      context.target.noFill();
      context.target.noStroke();
    };
  },
};
