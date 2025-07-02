import { IconCircuitSwitchOpen } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { updateAndReadPreviousFromCache } from "../../Utils/graph/execution/blackboardCache";

export const DetectThreshold: NodeDefinition = {
  id: "State/DetectThreshold",
  label: "Detect Threshold",
  icon: IconCircuitSwitchOpen,
  description: "Output true only on when the input number cross the target",

  dataInputs: [Port.number("in"), Port.number("target"), Port.CacheId()],
  dataOutputs: [Port.bool("out")],
  tags: ["State"],
  settings: [
    {
      id: "direction",
      type: "dropdown",
      defaultValue: "both",
      options: ["both", "ascending", "descending"],
    },
  ],
  getData(portId, node, context) {
    const current = context.getInputValueNumber(node, "in");
    const target = context.getInputValueNumber(node, "target");
    const previous = updateAndReadPreviousFromCache(context, node, current);
    const signPrevious = Math.sign(previous - target);
    const signCurrent = Math.sign(current - target);
    if (signCurrent != signPrevious) {
      if (node.settings.direction === "both") {
        return true;
      }
      if (signPrevious === -1 && node.settings.direction === "ascending") {
        return true;
      }
      if (signPrevious === 1 && node.settings.direction === "descending") {
        return true;
      }
    }
    return false;
  },
};
