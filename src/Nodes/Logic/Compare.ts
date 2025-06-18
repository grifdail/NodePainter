import { IconMathEqualGreater } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Comparator, ComparatorOps } from "../../Utils/math/logicUtils";

export const Compare: NodeDefinition = {
  id: "Compare",
  description: "Compare two numeric value",
  icon: IconMathEqualGreater,
  tags: ["Logic", "Math"],
  alias: "Equals Lower Greater Different",
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

  settings: [
    {
      id: "comparator",
      type: "dropdown",
      defaultValue: ComparatorOps[0],
      options: ComparatorOps,
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
