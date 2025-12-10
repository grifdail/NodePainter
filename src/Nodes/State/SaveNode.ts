import { IconDeviceFloppy } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { Port } from "../../Types/PortTypeGenerator";
import { changeTypeGenerator } from "../../Utils/graph/definition/changeTypeGenerator";
import { useCache } from "../../Utils/graph/execution/blackboardCache";

export const SaveNode: NodeDefinition = {
  id: "State/Save",
  label: "Save",
  icon: IconDeviceFloppy,
  description: "Save the input when the save boolean is on",

  dataInputs: [Port.bool("in"), Port.bool("save"), Port.CacheId()],
  dataOutputs: [Port.bool("out")],
  tags: ["State"],
  ...changeTypeGenerator(portTypesWithTags(["common"]), ["in"], ["out"]),
  settings: [],
  getData(portId, node, context) {
    const current = context.getInputValue(node, "in", node.selectedType);
    const save = context.getInputValueBoolean(node, "save");

    const [previous, setValue] = useCache(context, node);
    if (previous === undefined || save) {
      setValue(current);
      return current;
    }
    return previous;
  },
};
