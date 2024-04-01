import { IconList } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { CommonTypes, PortType } from "../../Types/PortType";
import { convertTypeValue } from "../../Utils/convertTypeValue";
import { createDefaultValue } from "../../Utils/createDefaultValue";

export const SelectFromArray: NodeDefinition = {
  id: "SelectFromArray",
  description: "Select an element of an based on the index",
  icon: IconList,
  tags: ["Array"],
  dataInputs: [
    {
      id: "index",
      type: "number",
      defaultValue: 0,
    },
    {
      id: "array",
      type: "array-number",
      defaultValue: [],
    },
  ],
  dataOutputs: [{ id: "out", defaultValue: 0, type: "number" }],
  executeOutputs: [],
  settings: [],
  canBeExecuted: false,
  defaultType: "number",
  availableTypes: CommonTypes,
  onChangeType(node, type) {
    node.dataInputs["array"].ownValue = convertTypeValue(node.dataInputs["array"].ownValue, node.dataInputs["array"].type, `array-${type}` as PortType);
    node.dataInputs["array"].type = `array-${type}` as PortType;
    node.dataOutputs["out"].type = type;
  },
  getData: (portId, node, context) => {
    const array = context.getInputValue(node, "array", `array-${node.selectedType}` as PortType) as any[];
    if (array.length < 1) {
      return createDefaultValue(node.selectedType);
    }
    const index = Math.floor(context.getInputValueNumber(node, "index"));
    return array[index % array.length];
  },
};
