import { IconArrowsShuffle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const RandomInt: NodeDefinition = {
  id: "RandomInt",
  description: "A random value between to integer, consistant across frames",
  icon: IconArrowsShuffle,
  tags: ["Input"],
  dataInputs: [
    {
      id: "min",
      type: "number",
      defaultValue: 0,
    },
    {
      id: "max",
      type: "number",
      defaultValue: 6,
    },
  ],
  dataOutputs: [{ id: "value", type: "number", defaultValue: 0 }],
  executeOutputs: [],
  settings: [],
  defaultType: "number",
  getData: (portId, nodeData, context) => {
    var min = context.getInputValueNumber(nodeData, "min");
    var max = context.getInputValueNumber(nodeData, "max");
    return Math.floor(context.RNG.next() * (max - min) + min);
  },
};
