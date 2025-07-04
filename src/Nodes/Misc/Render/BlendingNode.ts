import { IconColorFilter } from "@tabler/icons-react";
import { BLEND_MODE } from "p5";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";

export const BlendingNode: NodeDefinition = {
  id: "Misc/Render/Blending",
  label: "Apply Blending",
  description: "Execute the next instruction with a blend mode applied",
  icon: IconColorFilter,
  tags: ["Misc"],
  dataInputs: [Port.drawing2d("drawing")],
  dataOutputs: [Port.drawing2d("out")],
  settings: [{ id: "mode", type: "dropdown", defaultValue: "Blend", options: ["Blend", "Add", "Darkest", "Lightest", "Difference", "Exclusion", "Multiply", "Screen", "Replace", "Remove", "Overlay", "Hard_light", "Soft_light", "Dodge", "Burn"] }],
  getData(portId, data, context) {
    var mode = data.settings.mode as string;
    var drawing = context.getInputValueDrawing(data, "drawing");
    return () => {
      context.target.blendMode((context.p5 as any)[mode.toUpperCase()] as BLEND_MODE);
      drawing();
      context.target.blendMode(context.p5.BLEND);
    };
  },
};
