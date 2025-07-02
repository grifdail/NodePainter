import { IconColorFilter, IconRectangle } from "@tabler/icons-react";
import { DoubleIconGen } from "../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createDefaultGradient, createVector2 } from "../../Types/vectorDataType";
import { toHex } from "../../Utils/math/colorUtils";

export const DrawGradientRect: NodeDefinition = {
  id: "Draw/GradientRect",
  label: "Draw Gradient Rect",
  description: "Draw a rectangle with a gradient",
  icon: DoubleIconGen(IconRectangle, IconColorFilter),
  tags: ["Drawing"],
  dataInputs: [
    {
      id: "gradient",
      type: "gradient",
      defaultValue: createDefaultGradient(),
    },
    {
      id: "direction",
      type: "number",
      defaultValue: 0,
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
  ],
  dataOutputs: [Port.drawing2d("out")],

  settings: [],
  getData(portId, node, context) {
    var gradient = context.getInputValueGradient(node, "gradient");
    var gradientDirection = context.getInputValueNumber(node, "direction");
    var p1 = context.getInputValueVector(node, "corner");
    var width = context.getInputValueNumber(node, "width");
    var height = context.getInputValueNumber(node, "height");
    return () => {
      context.target.noFill();
      context.target.noStroke();
      const ctx = context.target.drawingContext as CanvasRenderingContext2D;
      var c = Math.cos(gradientDirection);
      var s = Math.sin(gradientDirection);
      var px = p1[0] + width * 0.5;
      var py = p1[1] + height * 0.5;
      var ctxGrad = ctx.createLinearGradient(px - c * width * 0.5, py - s * height * 0.5, px + c * width * 0.5, py + s * height * 0.5);
      gradient.forEach((stop) => {
        ctxGrad.addColorStop(stop.pos, toHex(stop.color));
      });
      ctx.fillStyle = ctxGrad;
      ctx.fillRect(p1[0], p1[1], width, height);
    };
  },
};
