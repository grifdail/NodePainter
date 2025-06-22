import { IconBrackets, IconList } from "@tabler/icons-react";
import { DoubleIconGen } from "../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortType } from "../../Types/PortType";
import { PortTypeDefinitions, portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { Port } from "../../Types/PortTypeGenerator";
import { changeTypeGenerator } from "../../Utils/graph/definition/changeTypeGenerator";

export const ArrayFirst: NodeDefinition = {
  id: "ArrayFirst",
  description: "Return the first element of an array",
  icon: DoubleIconGen(IconList, IconBrackets),
  tags: ["Array"],
  dataInputs: [Port["array-number"]("array")],
  dataOutputs: [Port["number"]("first")],
  settings: [],
  availableTypes: portTypesWithTags(["common"], ["array"]),
  onChangeType: changeTypeGenerator([], ["first"], ["array"], []),
  getData: (portId, node, context) => {
    const start = context.getInputValue(node, "array", `array-${node.selectedType}` as PortType) as any[];
    return start.length < 1 ? PortTypeDefinitions[node.selectedType].createDefaultValue() : start[0];
  },
};
