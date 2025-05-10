import { IconBucketDroplet } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createColor } from "../../Types/vectorDataType";
import { toP5Color } from "../../Utils/colorUtils";

export const FillBackground: NodeDefinition = {
  id: "FillBackground",
  label: "Fill Background",
  description: "Fill the entire canvas",
  icon: IconBucketDroplet,
  tags: ["Draw"],
  dataInputs: [
    {
      id: "color",
      type: "color",
      defaultValue: createColor(1, 1, 1),
    },
  ],
  dataOutputs: [],
  executeOutputs: [],
  settings: [],
  canBeExecuted: true,
  execute: (data, context) => {
    var color = context.getInputValueColor(data, "color");
    context.target.background(toP5Color(color, context.p5));
  },
};
