import { IconList, IconQuestionMark } from "@tabler/icons-react";
import { DoubleIconGen } from "../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { changeTypeGenerator } from "../../Utils/graph/definition/changeTypeGenerator";

export const CountNode: NodeDefinition = {
  id: "Array/Count",
  description: "Count the number of element in an array",
  icon: DoubleIconGen(IconList, IconQuestionMark),
  alias: "Length Size Count",
  tags: ["Array"],
  dataInputs: [
    {
      id: "array",
      type: "array-color",
      defaultValue: [],
    },
  ],
  codeBlockType: "expression",
  dataOutputs: [{ id: "out", defaultValue: 0, type: "number" }],
  settings: [],
  ...changeTypeGenerator(portTypesWithTags(["array"]), ["array"], []),
  getData: (portId, node, context) => {
    const array = context.getInputValue(node, "array", node.selectedType) as any[];

    return array.length;
  },
};
