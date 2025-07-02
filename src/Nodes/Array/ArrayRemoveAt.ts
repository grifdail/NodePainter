import { IconBrackets, IconList } from "@tabler/icons-react";
import { DoubleIconGen } from "../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { Port } from "../../Types/PortTypeGenerator";
import { changeTypeGenerator } from "../../Utils/graph/definition/changeTypeGenerator";

export const ArrayRemoveAt: NodeDefinition = {
  id: "ArrayRemoveAt",
  description: "Return a copy of the array the element at a specific position removed",
  icon: DoubleIconGen(IconList, IconBrackets),
  tags: ["Array"],
  dataInputs: [Port["array-number"]("array"), Port.number("position")],
  dataOutputs: [Port["array-number"]("out")],
  settings: [],
  codeBlockType: "expression",
  ...changeTypeGenerator(portTypesWithTags(["common", "array"]), ["array"], ["out"]),
  getData: (portId, node, context) => {
    const array = context.getInputValue(node, "array", node.selectedType) as any[];
    if (array.length == 0) {
      return [];
    }
    const position = Math.floor(context.getInputValueNumber(node, "position")) % array.length;

    if (position === 0) {
      return array.slice(1);
    }
    if (position === array.length - 1) {
      return array.slice(1, -1);
    }
    return [...array.slice(0, position), ...array.slice(position + 1)];
  },
};
