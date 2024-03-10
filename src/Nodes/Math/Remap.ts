import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { genShader } from "../../Data/genShader";

export const Remap: NodeDefinition = {
  id: "Remap",
  tags: ["Math"],
  icon: IconMathFunction,
  description: "Remap a number from one interval to the other",
  dataInputs: [
    {
      id: "t",
      type: "number",
      defaultValue: 0,
    },
    {
      id: "in-min",
      type: "number",
      defaultValue: -1,
    },
    {
      id: "in-max",
      type: "number",
      defaultValue: 1,
    },
    {
      id: "out-min",
      type: "number",
      defaultValue: 0,
    },
    {
      id: "out-max",
      type: "number",
      defaultValue: 1,
    },
    {
      id: "clamp",
      type: "bool",
      defaultValue: true,
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
    var t = context.getInputValueNumber(nodeData, "t");
    var inmin = context.getInputValueNumber(nodeData, "in-min");
    var inmax = context.getInputValueNumber(nodeData, "in-max");
    var outmin = context.getInputValueNumber(nodeData, "out-min");
    var outmax = context.getInputValueNumber(nodeData, "out-max");
    var clamp = context.getInputValueBoolean(nodeData, "clamp");
    var dt = (t - inmin) / (inmax - inmin);
    var r = dt * outmax + (1 - dt) * outmin;
    var trueMin = Math.min(outmax, outmin);
    var trueMax = Math.max(outmax, outmin);
    return clamp ? Math.min(trueMax, Math.max(trueMin, r)) : r;
  },
  shaderRequirement: `float map(float n, float inmin, float inmax, float outmin, float outmax, bool c) {
      float dt = (n - inmin) / (inmax - inmin);
      float r = dt * outmax + (1.0 - dt) * outmin;
      return c ? clamp(r, min(outmin, outmax), max(outmax, outmin)) : r;
}`,
  getShaderCode(node, context) {
    return genShader(node, context, "float", "result", ["t", "in-min", "in-max", "out-min", "out-max", "clamp"], ([t, a, b, c, d, e]) => `map(${t}, ${a}, ${b}, ${c}, ${d}, ${e})`);
  },
};
