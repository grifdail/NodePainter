import { IconList } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortTypeDefinitions, portTypesWithProperty } from "../../Types/PortTypeDefinitions";
import { changeTypeGenerator } from "../../Utils/graph/definition/changeTypeGenerator";
import { enforceCorrectVectorTypeForNode } from "../../Utils/graph/execution/enforceCorrectVectorTypeForNode";

export const Sum: NodeDefinition = {
  id: "Sum",
  description: "Sum up all the value in the array",
  icon: IconList,
  tags: ["Array"],
  dataInputs: [
    {
      id: "array",
      type: "array-number",
      defaultValue: [],
    },
  ],
  dataOutputs: [{ id: "out", defaultValue: 0, type: "number" }],

  settings: [],
  availableTypes: portTypesWithProperty("additionOperator"),
  ...changeTypeGenerator([], ["out"], ["array"]),
  getData: (portId, node, context) => {
    const array = context.getInputValueVectorArray(node, "array");
    var operator = PortTypeDefinitions[node.selectedType].additionOperator || ((a, b) => a + b);
    return enforceCorrectVectorTypeForNode(node, array.reduce(operator, PortTypeDefinitions[node.selectedType].createDefaultValue()));
  },
};
