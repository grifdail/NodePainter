import { IconRectangle } from "@tabler/icons-react";
import { createDefaultGradient, createVector2 } from "../../Data/vectorDataType";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { toHex } from "../../Data/colorUtils";

export const DrawGradientRect: NodeDefinition = {
  id: "DrawGradientRect",
  description: "Draw a rectangle with a gradient",
  icon: IconRectangle,
  tags: ["Draw"],
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
  dataOutputs: [],
  executeOutputs: [],
  settings: [],
  canBeExecuted: true,
  execute: (data, context) => {
    var gradient = context.getInputValueGradient(data, "gradient");
    var gradientDirection = context.getInputValueNumber(data, "direction");
    var p1 = context.getInputValueVector(data, "corner");
    var width = context.getInputValueNumber(data, "width");
    var height = context.getInputValueNumber(data, "height");
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
  },
};
