import { IconArrowsMove } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";

export const ExecuteWithMask: NodeDefinition = {
  id: "WithMask",
  label: "Render With Mask",
  description: "Execute the draw instruction masked by the mask.",
  icon: IconArrowsMove,
  tags: ["Transform"],
  dataInputs: [{ id: "inverted", type: "bool", defaultValue: false }, Port.drawing2d("mask"), Port.drawing2d("drawing")],
  dataOutputs: [Port.drawing2d("out")],
  settings: [],
  getData(portId, data, context) {
    const inverted = context.getInputValueBoolean(data, "inverted");
    const mask = context.getInputValueDrawing(data, "mask");
    const drawing = context.getInputValueDrawing(data, "drawing");
    return () => {
      context.target.push();
      (context.p5 as any).beginClip({ invert: inverted });
      mask();
      (context.p5 as any).endClip();
      drawing();
      context.target.pop();
    };
  },
};
