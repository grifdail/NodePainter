import { IconDeviceFloppy } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { Port } from "../../Types/PortTypeGenerator";
import { changeTypeGenerator } from "../../Utils/graph/definition/changeTypeGenerator";
import { createOrSelectFromCache } from "../../Utils/useCache";

export const CacheNode: NodeDefinition = {
  id: "Cache",
  description: "Precompute and cache the input. The randomness wont change and it may help performance",
  icon: IconDeviceFloppy,
  tags: ["State"],
  alias: "Precompute",
  dataInputs: [Port.number("value"), Port.CacheId()],
  dataOutputs: [Port.number("cached")],
  settings: [],
  availableTypes: portTypesWithTags(["common"]),
  onChangeType: changeTypeGenerator(["value"], ["cached"]),
  getData: (portId, node, context) => {
    var target = createOrSelectFromCache(context, node, () => context.getInputValue(node, "value", node.selectedType));
    return target;
  },
};
