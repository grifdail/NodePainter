import { IconShadow } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { toHex } from "../../../Utils/math/colorUtils";

export const RenderWithShadow: NodeDefinition = {
  id: "Misc/Render/Shadow",
  label: "Apply shadow",
  description: "Execute the next instruction with a blurry shadow below it",
  icon: IconShadow,
  tags: ["Misc"],
  dataInputs: [Port.number("blur"), Port.color("color"), Port.vector2("offset"), Port.drawing2d("drawing")],
  dataOutputs: [Port.drawing2d("out")],
  settings: [],
  getData(portId, node, context) {
    var blur = context.getInputValueNumber(node, "blur");
    var color = context.getInputValueColor(node, "color");
    var offset = context.getInputValueVector2(node, "offset");
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
