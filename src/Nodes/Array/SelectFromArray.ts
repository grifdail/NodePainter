import { IconBrackets, IconList } from "@tabler/icons-react";
import { DoubleIconGen } from "../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortType } from "../../Types/PortType";
import { PortTypeDefinitions, portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { changeTypeGenerator } from "../../Utils/graph/definition/changeTypeGenerator";
import { Constraints } from "../../Utils/ui/applyConstraints";

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
  codeBlockType: "expression",
  settings: [],
  availableTypes: portTypesWithTags(["common"], ["array"]),
  ...changeTypeGenerator(portTypesWithTags(["common"], ["array"]), [], ["out"], ["array"]),

  getData: (portId, node, context) => {
    const array = context.getInputValue(node, "array", `array-${node.selectedType}` as PortType) as any[];
    if (array.length < 1) {
      return PortTypeDefinitions[node.selectedType].createDefaultValue();
    }
    const index = Math.floor(context.getInputValueNumber(node, "index"));
    if (index < 0) {
      return array[(array.length + (index % array.length)) % array.length];
    }
    return array[index % array.length];
  },
};
