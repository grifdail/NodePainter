import { IconCircuitSwitchOpen } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { FullCommonTypes } from "../../Types/PortType";
import { Port } from "../../Types/PortTypeGenerator";
import { changeTypeGenerator } from "../../Utils/changeTypeGenerator";
import { updateAndReadFromCache } from "../../Utils/useCache";

export const SaveNode: NodeDefinition = {
  id: "Save",
  label: "Save",
  icon: IconCircuitSwitchOpen,
  description: "Save the input when the save boolean is on",

  dataInputs: [Port.bool("in"), Port.bool("save"), Port.CacheId()],
  dataOutputs: [Port.bool("out")],
  tags: ["Statefull"],
  availableTypes: FullCommonTypes,
  onChangeType: changeTypeGenerator(["in"], ["out"]),
  settings: [],
  getData(portId, node, context) {
    const current = context.getInputValue(node, "in", node.selectedType);
    const save = context.getInputValueBoolean(node, "save");
    const previous = updateAndReadFromCache(context, node, (oldValue) => (oldValue === undefined || save ? current : oldValue));

    return previous;
  },
};
