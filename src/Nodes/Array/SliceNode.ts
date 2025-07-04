import { IconList } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { changeTypeGenerator } from "../../Utils/graph/definition/changeTypeGenerator";
import { Constraints } from "../../Utils/ui/applyConstraints";

export const SliceNode: NodeDefinition = {
  id: "Array/Slice",
  description: "Return a portion of the value",
  icon: IconList,
  tags: ["Array"],
  dataInputs: [
    {
      id: "array",
      type: "array-number",
      defaultValue: [],
    },
    {
      id: "start",
      type: "number",
      defaultValue: 0,
      constrains: [Constraints.Positive(), Constraints.Integer()],
    },
    {
      id: "count",
      type: "number",
      defaultValue: 2,
      constrains: [Constraints.Positive(), Constraints.Integer()],
    },
  ],
  dataOutputs: [{ id: "out", defaultValue: [0], type: "array-number" }],

  codeBlockType: "expression",
  settings: [],
  ...changeTypeGenerator(portTypesWithTags(["common"], ["array"]), ["array"], ["out"]),
  getData: (portId, node, context) => {
    const array = context.getInputValueVectorArray(node, "array");
    const start = Math.floor(context.getInputValueNumber(node, "start"));
    const count = Math.floor(context.getInputValueNumber(node, "count"));
    if (start >= array.length) {
      return [];
    }
    return array.slice(start, Math.max(array.length, start + count));
  },
};
