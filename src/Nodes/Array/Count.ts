import { IconList } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { changeTypeGenerator } from "../../Utils/changeTypeGenerator";

export const Count: NodeDefinition = {
  id: "Count",
  description: "Count the number of element in an array",
  icon: IconList,
  tags: ["Array"],
  dataInputs: [
    {
      id: "array",
      type: "array-color",
      defaultValue: [],
    },
  ],
  dataOutputs: [{ id: "out", defaultValue: 0, type: "number" }],

  settings: [],

  availableTypes: portTypesWithTags(["array"]),
  onChangeType: changeTypeGenerator(["array"], []),
  getData: (portId, node, context) => {
    const array = context.getInputValue(node, "array", node.selectedType) as any[];

    return array.length;
  },
};
