import { IconArrowNarrowLeft, IconStatusChange } from "@tabler/icons-react";
import { DoubleIcon } from "../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { Port } from "../../Types/PortTypeGenerator";
import { changeTypeGenerator } from "../../Utils/changeTypeGenerator";
import { updateAndReadPreviousFromCache } from "../../Utils/useCache";

export const PreviousNode: NodeDefinition = {
  id: "Previous",
  label: "Previous",
  icon: DoubleIcon(IconStatusChange, IconArrowNarrowLeft),
  description: "Output the value of the input at the previous call",

  dataInputs: [Port.bool("in"), Port.CacheId()],
  dataOutputs: [Port.bool("out")],
  tags: ["Statefull"],
  availableTypes: portTypesWithTags(["common"]),
  onChangeType: changeTypeGenerator(["in"], ["out"]),
  settings: [],
  getData(portId, node, context) {
    const current = context.getInputValue(node, "in", node.selectedType);
    const previous = updateAndReadPreviousFromCache(context, node, current);

    return previous;
  },
};
