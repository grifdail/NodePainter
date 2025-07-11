import { IconList } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortType } from "../../Types/PortType";
import { PortTypeDefinitions, portTypesWithProperty } from "../../Types/PortTypeDefinitions";
import { changeTypeGenerator } from "../../Utils/graph/definition/changeTypeGenerator";

export const SumNode: NodeDefinition = {
  id: "Array/Sum",
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
  ...changeTypeGenerator(portTypesWithProperty("additionOperator"), [], ["out"], ["array"]),
  getData: (portId, node, context) => {
    const array = context.getInputValue(node, "array", `array-${node.selectedType}` as PortType) as Array<any>;
    var operator = PortTypeDefinitions[node.selectedType].additionOperator || ((a, b) => a + b);
    return array.reduce(operator, PortTypeDefinitions[node.selectedType].createDefaultValue());
  },
};
