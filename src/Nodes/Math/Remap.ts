import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { genShader } from "../../Data/genShader";
import { EnforceGoodType, VectorLerp, VectorTypesFull } from "../../Data/vectorUtils";
import { changeTypeGenerator } from "../../Data/changeTypeGenerator";

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
  defaultType: "number",
  availableTypes: VectorTypesFull,
  onChangeType: changeTypeGenerator(["out-min", "out-max"], ["result"]),
  getData: (portId, nodeData, context) => {
    const t = context.getInputValueNumber(nodeData, "t");
    const inmin = context.getInputValueNumber(nodeData, "in-min");
    const inmax = context.getInputValueNumber(nodeData, "in-max");
    const outmin = context.getInputValueVector(nodeData, "out-min");
    const outmax = context.getInputValueVector(nodeData, "out-max");
    const clamp = context.getInputValueBoolean(nodeData, "clamp");
    const dt = (t - inmin) / (inmax - inmin);
    const result = VectorLerp(outmin, outmax, clamp ? Math.max(Math.min(dt, 1), 0) : dt);

    return EnforceGoodType(nodeData, result);
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
