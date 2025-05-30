import { IconBucketDroplet } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";

export const Clear: NodeDefinition = {
  id: "Clear",
  description: "Clear the entire canvas",
  icon: IconBucketDroplet,
  tags: ["Draw"],
  dataInputs: [],
  dataOutputs: [Port.drawing2d("out")],

  settings: [],
  getData(portId, node, context) {
    return () => {
      context.target.clear(0, 0, 0, 0);
    };
  },
};
