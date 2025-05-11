import { IconArrowsHorizontal } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createVector2 } from "../../Types/vectorDataType";

export const Dimension: NodeDefinition = {
  id: "Dimension",
  description: "The dimension of the canvas",
  icon: IconArrowsHorizontal,
  tags: ["Input"],
  dataInputs: [],
  dataOutputs: [{ id: "dim", type: "vector2", defaultValue: createVector2(0, 0) }],

  settings: [],
  getData: (portId, nodeData, context) => {
    return createVector2(context.p5.width, context.p5.height);
  },
};
