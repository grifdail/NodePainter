import { IconCircuitSwitchOpen } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { updateAndReadPreviousFromCache } from "../../Utils/graph/execution/blackboardCache";

const EdgeTypes = ["Both", "Rising", "Falling"] as const;
type EdgeType = (typeof EdgeTypes)[number];

export const EdgeNode: NodeDefinition = {
  id: "EdgeNode",
  label: "Edge",
  icon: IconCircuitSwitchOpen,
  description: "Output true only on when the input has just changed. Can be configured to only output when switch from false to true, the opposite or both",

  dataInputs: [Port.bool("in"), Port.CacheId()],
  dataOutputs: [Port.bool("out")],
  tags: ["State"],
  settings: [{ id: "Edge", type: "dropdown", defaultValue: "Both", options: EdgeTypes.slice() }],
  getData(portId, node, context) {
    const edge = node.settings["Edge"] as EdgeType;
    const current = context.getInputValueBoolean(node, "in");
    const previous = updateAndReadPreviousFromCache(context, node, current);
    if (current != previous) {
      if (edge === "Both") {
        return true;
      }
      if (edge === "Rising" && !previous && current) {
        return true;
      }
      if (edge === "Falling" && previous && !current) {
        return true;
      }
    }
    return false;
  },
};
