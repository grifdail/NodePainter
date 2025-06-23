import { IconBrackets, IconList } from "@tabler/icons-react";
import { DoubleIconGen } from "../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortType } from "../../Types/PortType";
import { portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { Port } from "../../Types/PortTypeGenerator";
import { changeTypeGenerator } from "../../Utils/graph/definition/changeTypeGenerator";

export const ArrayAppend: NodeDefinition = {
  id: "ArrayAppend",
  alias: "Push Add",
  description: "Return a copy of the array with the new elements added at the end",
  icon: DoubleIconGen(IconList, IconBrackets),
  tags: ["Array"],
  dataInputs: [Port["array-number"]("array"), Port.number("value")],
  dataOutputs: [Port["array-number"]("out")],
  settings: [],
  ...changeTypeGenerator(portTypesWithTags(["common"], ["array"]), ["value"], [], ["array"], ["out"]),
  getData: (portId, node, context) => {
    const start = context.getInputValue(node, "array", `array-${node.selectedType}` as PortType) as any[];
    const value = context.getInputValue(node, "value", node.selectedType) as any[];
    return [...start, value];
  },
};
