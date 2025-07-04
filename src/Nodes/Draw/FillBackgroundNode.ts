import { IconBucketDroplet } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createColor } from "../../Types/vectorDataType";
import { toP5Color } from "../../Utils/math/colorUtils";

export const FillBackgroundNode: NodeDefinition = {
  id: "Draw/FillBackground",
  label: "Fill Background",
  description: "Fill the entire canvas",
  icon: IconBucketDroplet,
  tags: ["Drawing"],
  dataInputs: [
    {
      id: "color",
      type: "color",
      defaultValue: createColor(1, 1, 1),
    },
  ],
  dataOutputs: [Port.drawing2d("out")],
  settings: [],
  getData(portId, node, context) {
    const color = context.getInputValueColor(node, "color");
    return () => {
      context.target.background(toP5Color(color, context.p5));
    };
  },
};
