import { IconArrowsMove } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const ExecuteWithMask: NodeDefinition = {
  id: "WithMask",
  label: "Render With Mask",
  description: "Execute the draw instruction masked by the mask.",
  icon: IconArrowsMove,
  tags: ["Transform"],
  dataInputs: [{ id: "inverted", type: "bool", defaultValue: false }],
  dataOutputs: [],
  executeOutputs: ["mask", "draw"],
  settings: [],
  canBeExecuted: true,
  execute: (data, context) => {
    var inverted = context.getInputValueBoolean(data, "inverted");
    context.target.push();
    (context.p5 as any).beginClip({ invert: inverted });
    if (data.execOutputs.mask) {
      context.execute(data.execOutputs.mask);
    }
    (context.p5 as any).endClip();
    if (data.execOutputs.draw) {
      context.execute(data.execOutputs.draw);
    }
    context.target.pop();
  },
};
