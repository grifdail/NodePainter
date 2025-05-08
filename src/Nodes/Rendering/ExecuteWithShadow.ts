import { IconShadow } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Vector2, createColor, createVector2 } from "../../Types/vectorDataType";
import { toHex } from "../../Utils/colorUtils";

export const ExecuteWithShadow: NodeDefinition = {
  id: "WithShadow",
  label: "Render with shadow",
  description: "Execute the next instruction with a blurry shadow below it",
  icon: IconShadow,
  tags: ["Transform"],
  dataInputs: [
    { id: "blur", type: "number", defaultValue: 1 },
    { id: "color", type: "color", defaultValue: createColor(0, 0, 0) },
    { id: "offset", type: "vector2", defaultValue: createVector2() },
  ],
  dataOutputs: [],
  executeOutputs: ["execute"],
  settings: [],
  canBeExecuted: true,
  execute: (data, context) => {
    var blur = context.getInputValueNumber(data, "blur");
    var color = context.getInputValueColor(data, "color");
    var offset = context.getInputValueVector(data, "offset") as Vector2;
    var ctx = context.target.drawingContext as CanvasRenderingContext2D;
    context.target.push();

    ctx.shadowBlur = blur;
    ctx.shadowColor = toHex(color);
    ctx.shadowOffsetX = offset[0];
    ctx.shadowOffsetY = offset[1];
    if (data.execOutputs.execute) {
      context.execute(data.execOutputs.execute);
    }
    ctx.shadowBlur = 0;
    ctx.shadowColor = "transparent";
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    context.target.pop();
  },
};
