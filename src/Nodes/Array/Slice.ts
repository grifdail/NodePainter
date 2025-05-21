import { IconList } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { CommonTypes } from "../../Types/PortType";
import { Constraints } from "../../Utils/applyConstraints";
import { changeTypeGenerator } from "../../Utils/changeTypeGenerator";

export const Slice: NodeDefinition = {
  id: "Slice",
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

  settings: [],
  availableTypes: CommonTypes,
  onChangeType: changeTypeGenerator([], [], ["array"], ["out"]),
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
