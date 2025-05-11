import { IconShadow } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { Vector2, createColor, createVector2 } from "../../Types/vectorDataType";
import { toHex } from "../../Utils/colorUtils";

export const ExecuteWithShadow: NodeDefinition = {
  id: "WithShadow",
  label: "Render with shadow",
  description: "Execute the next instruction with a blurry shadow below it",
  icon: IconShadow,
  tags: ["Transform"],
  dataInputs: [{ id: "blur", type: "number", defaultValue: 1 }, { id: "color", type: "color", defaultValue: createColor(0, 0, 0) }, { id: "offset", type: "vector2", defaultValue: createVector2() }, Port.drawing2d("drawing")],
  dataOutputs: [Port.drawing2d("out")],
  settings: [],
  getData(portId, node, context) {
    var blur = context.getInputValueNumber(node, "blur");
    var color = context.getInputValueColor(node, "color");
    var offset = context.getInputValueVector(node, "offset") as Vector2;
    const drawing = context.getInputValueDrawing(node, "drawing");
    return () => {
      var ctx = context.target.drawingContext as CanvasRenderingContext2D;
      context.target.push();

      ctx.shadowBlur = blur;
      ctx.shadowColor = toHex(color);
      ctx.shadowOffsetX = offset[0];
      ctx.shadowOffsetY = offset[1];
      drawing();
      ctx.shadowBlur = 0;
      ctx.shadowColor = "transparent";
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      context.target.pop();
    };
  },
};
