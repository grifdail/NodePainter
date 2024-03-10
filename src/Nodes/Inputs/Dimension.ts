import { IconArrowsHorizontal } from "@tabler/icons-react";
import { createVector2 } from "../../Data/vectorDataType";
import { NodeDefinition } from "../../Data/NodeDefinition";

export const Dimension: NodeDefinition = {
  id: "Dimension",
  description: "The dimension of the canvas",
  icon: IconArrowsHorizontal,
  tags: ["Input"],
  dataInputs: [],
  dataOutputs: [{ id: "dim", type: "vector2", defaultValue: createVector2(0, 0) }],
  executeOutputs: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    return createVector2(context.p5.width, context.p5.height);
  },
};
