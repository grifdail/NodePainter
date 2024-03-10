import { IconArrowUpRightCircle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { Comparator } from "../../Data/logicUtils";

export const Compare: NodeDefinition = {
  id: "Compare",
  description: "Create a vector from a set of coordinate",
  icon: IconArrowUpRightCircle,
  tags: ["Logic", "Math"],
  dataInputs: [
    {
      id: "a",
      type: "number",
      defaultValue: 0,
    },
    {
      id: "b",
      type: "number",
      defaultValue: 0,
    },
  ],
  dataOutputs: [{ id: "result", type: "bool", defaultValue: false }],
  executeOutputs: [],
  settings: [
    {
      id: "comparator",
      type: "dropdown",
      defaultValue: "==",
      options: ["equals", "different", "lower that", "lower than or equals", "greater than", "greater than or equals", "approximately equals", "approximately different"],
    },
  ],

  getData: (portId, nodeData, context) => {
    var a = context.getInputValueNumber(nodeData, "a");
    var b = context.getInputValueNumber(nodeData, "b");
    var comparator = nodeData.settings.comparator as string;
    var func = Comparator[comparator];
    if (func !== undefined) {
      return func(a, b) as boolean;
    } else {
      return false;
    }
  },
};
