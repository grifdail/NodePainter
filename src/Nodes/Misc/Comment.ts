import { IconMessage } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const Comment: NodeDefinition = {
  id: "Misc/Comment",
  featureLevel: 10,
  description: "Leave a comment on your sketch. Doesnt have any logic.",
  icon: IconMessage,
  tags: ["Misc"],
  dataInputs: [],
  dataOutputs: [],
  settings: [{ id: "comment", type: "text-area", defaultValue: "Write here" }],
  getData(portId, node, context) {},
};
