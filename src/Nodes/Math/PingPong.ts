import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const PingPong: NodeDefinition = {
  id: "PingPong",
  tags: ["Math"],
  icon: IconMathFunction,
  description: "Return a number alternating betwen min and max",
  dataInputs: [
    {
      id: "t",
      type: "number",
      defaultValue: 0,
    },
    {
      id: "min",
      type: "number",
      defaultValue: 0,
    },
    {
      id: "max",
      type: "number",
      defaultValue: 1,
    },
  ],
  dataOutputs: [
    {
      id: "result",
      type: "number",
      defaultValue: 0,
    },
  ],
  executeOutputs: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    if (portId === "result") {
      var t = context.getInputValueNumber(nodeData, "t");
      var min = context.getInputValueNumber(nodeData, "min");
      var max = context.getInputValueNumber(nodeData, "max");
      var alignedT = t - min;
      var range = max - min;
      var tt = alignedT % (2 * range);
      return tt >= range ? 2 * range - tt : tt;
    }
  },
};
