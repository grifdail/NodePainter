import { IconCircuitSwitchOpen } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { FullCommonTypes } from "../../Types/PortType";
import { Port } from "../../Types/PortTypeGenerator";
import { changeTypeGenerator } from "../../Utils/changeTypeGenerator";
import { updateAndReadPreviousFromCache } from "../../Utils/useCache";

export const PreviousNode: NodeDefinition = {
  id: "Previous",
  label: "Previous",
  icon: IconCircuitSwitchOpen,
  description: "Output the value of the input at the previous call",

  dataInputs: [Port.bool("in"), Port.CacheId()],
  dataOutputs: [Port.bool("out")],
  tags: ["Statefull"],
  availableTypes: FullCommonTypes,
  onChangeType: changeTypeGenerator(["in"], ["out"]),
  settings: [],
  getData(portId, node, context) {
    const current = context.getInputValue(node, "in", node.selectedType);
    const previous = updateAndReadPreviousFromCache(context, node, current);

    return previous;
  },
};
