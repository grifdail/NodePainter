import { IconColorFilter } from "@tabler/icons-react";
import { BLEND_MODE } from "p5";
import { NodeDefinition } from "../../Data/NodeDefinition";

export const ExecuteWithBlending: NodeDefinition = {
  id: "WithBlending",
  label: "Render With Blending",
  description: "Execute the next instruction with a blend mode applied",
  icon: IconColorFilter,
  tags: ["Transform", "Rendering"],
  dataInputs: [],
  dataOutputs: [],
  executeOutputs: ["execute"],
  settings: [{ id: "mode", type: "dropdown", defaultValue: "Blend", options: ["Blend", "Add", "Darkest", "Lightest", "Difference", "Exclusion", "Multiply", "Screen", "Replace", "Remove", "Overlay", "Hard_light", "Soft_light", "Dodge", "Burn"] }],
  canBeExecuted: true,
  execute: (data, context) => {
    var mode = data.settings.mode as string;

    context.target.blendMode((context.p5 as any)[mode.toUpperCase()] as BLEND_MODE);
    if (data.execOutputs.execute) {
      context.execute(data.execOutputs.execute);
    }

    context.target.blendMode(context.p5.BLEND);
  },
};
