import { IconEraser } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";

export const ClearNode: NodeDefinition = {
  id: "Draw/Clear",
  description: "Clear the entire canvas",
  icon: IconEraser,
  tags: ["Drawing"],
  dataInputs: [],
  dataOutputs: [Port.drawing2d("out")],

  settings: [],
  getData(portId, node, context) {
    return () => {
      context.target.clear(0, 0, 0, 0);
    };
  },
};
