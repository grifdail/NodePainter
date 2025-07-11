import { IconBrackets, IconList } from "@tabler/icons-react";
import { DoubleIconGen } from "../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { Port } from "../../Types/PortTypeGenerator";
import { changeTypeGenerator } from "../../Utils/graph/definition/changeTypeGenerator";

export const InvertNode: NodeDefinition = {
  id: "Array/Invert",
  description: "Reorder the element of the array so that the last element become the first",
  alias: "Inverse",
  icon: DoubleIconGen(IconList, IconBrackets),
  tags: ["Array"],
  dataInputs: [Port["array-number"]("array")],
  dataOutputs: [Port["array-number"]("reversed")],
  settings: [],
  codeBlockType: "expression",
  ...changeTypeGenerator(portTypesWithTags(["common", "array"]), ["array"], ["reversed"]),
  getData: (portId, node, context) => {
    const start = context.getInputValue(node, "array", node.selectedType) as any[];
    return [...start].reverse();
  },
};
