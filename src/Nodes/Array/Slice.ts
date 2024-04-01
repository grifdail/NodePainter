import { IconList } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { CommonTypes } from "../../Types/PortType";
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
    },
    {
      id: "count",
      type: "number",
      defaultValue: 2,
    },
  ],
  dataOutputs: [{ id: "out", defaultValue: [0], type: "array-number" }],
  executeOutputs: [],
  settings: [],
  canBeExecuted: false,
  defaultType: "number",
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
