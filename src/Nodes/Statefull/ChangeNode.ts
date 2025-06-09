import { IconStatusChange } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortTypeDefinitions, portTypesWithProperty } from "../../Types/PortTypeDefinitions";
import { Port } from "../../Types/PortTypeGenerator";
import { changeTypeGenerator } from "../../Utils/changeTypeGenerator";
import { updateAndReadPreviousFromCache } from "../../Utils/useCache";

export const ChangeNode: NodeDefinition = {
  id: "Change",
  label: "Change",
  icon: IconStatusChange,
  description: "Output the difference between the input value from this frame and the previous call",

  dataInputs: [Port.bool("in"), Port.CacheId()],
  dataOutputs: [Port.bool("out")],
  tags: ["Statefull"],
  availableTypes: portTypesWithProperty("subtractionOperator"),
  onChangeType: changeTypeGenerator(["in"], ["out"]),
  settings: [],
  getData(portId, node, context) {
    const current = context.getInputValue(node, "in", node.selectedType);
    const previous = updateAndReadPreviousFromCache(context, node, current);
    const differenciator = PortTypeDefinitions[node.selectedType].subtractionOperator;
    if (differenciator) {
      return differenciator(current, previous);
    }
    return PortTypeDefinitions[node.selectedType].createDefaultValue();
  },
};
