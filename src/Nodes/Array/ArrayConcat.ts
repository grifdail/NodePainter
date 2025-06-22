import { IconBrackets, IconList } from "@tabler/icons-react";
import { DoubleIconGen } from "../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { Port } from "../../Types/PortTypeGenerator";
import { changeTypeGenerator } from "../../Utils/graph/definition/changeTypeGenerator";

export const ArrayConcat: NodeDefinition = {
  id: "ArrayConcat",
  description: "Merge two array together by appending the second one at the end of the first.",
  alias: "Merge combine mix",
  icon: DoubleIconGen(IconList, IconBrackets),
  tags: ["Array"],
  dataInputs: [Port["array-number"]("start"), Port["array-number"]("end")],
  dataOutputs: [Port["array-number"]("out")],

  settings: [],
  availableTypes: portTypesWithTags(["common", "array"]),
  onChangeType: changeTypeGenerator(["start", "end"], ["out"]),
  getData: (portId, node, context) => {
    const start = context.getInputValue(node, "start", node.selectedType) as any[];
    const end = context.getInputValue(node, "end", node.selectedType) as any[];

    return [...start, ...end];
  },
};
