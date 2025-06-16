import { IconBrackets, IconList } from "@tabler/icons-react";
import { DoubleIconGen } from "../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortType } from "../../Types/PortType";
import { PortTypeDefinitions, portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { Constraints } from "../../Utils/applyConstraints";
import { convertTypeValue } from "../../Utils/convertTypeValue";

export const SelectFromArray: NodeDefinition = {
  id: "SelectFromArray",
  description: "Select an element of an based on the index",
  alias: "Get Index",
  icon: DoubleIconGen(IconList, IconBrackets),
  tags: ["Array"],
  dataInputs: [
    {
      id: "index",
      type: "number",
      defaultValue: 0,
      constrains: [Constraints.Positive(), Constraints.Integer()],
    },
    {
      id: "array",
      type: "array-number",
      defaultValue: [],
    },
  ],
  dataOutputs: [{ id: "out", defaultValue: 0, type: "number" }],

  settings: [],
  availableTypes: portTypesWithTags(["common"], ["array"]),
  onChangeType(node, type) {
    node.dataInputs["array"].ownValue = convertTypeValue(node.dataInputs["array"].ownValue, node.dataInputs["array"].type, `array-${type}` as PortType);
    node.dataInputs["array"].type = `array-${type}` as PortType;
    node.dataOutputs["out"].type = type;
  },
  getData: (portId, node, context) => {
    const array = context.getInputValue(node, "array", `array-${node.selectedType}` as PortType) as any[];
    if (array.length < 1) {
      return PortTypeDefinitions[node.selectedType].createDefaultValue();
    }
    const index = Math.floor(context.getInputValueNumber(node, "index"));
    return array[index % array.length];
  },
};
