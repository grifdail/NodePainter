import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { portTypesWithTags } from "../../../Types/PortTypeDefinitions";
import { changeTypeGenerator } from "../../../Utils/graph/definition/changeTypeGenerator";
import { enforceCorrectVectorTypeForNode } from "../../../Utils/graph/execution/enforceCorrectVectorTypeForNode";
import { generateShaderCodeFromNodeData } from "../../../Utils/graph/execution/generateShaderCodeFromNodeData";
import { vectorLerp } from "../../../Utils/math/vectorUtils";

export const RemapNode: NodeDefinition = {
  id: "Math/Interpolation/Remap",
  tags: ["Math"],
  icon: IconMathFunction,
  description: "Remap a number from one interval to the other",
  featureLevel: 99,
  dataInputs: [
    {
      id: "t",
      type: "number",
      defaultValue: 0,
    },
    {
      id: "inmin",
      type: "number",
      defaultValue: -1,
    },
    {
      id: "inmax",
      type: "number",
      defaultValue: 1,
    },
    {
      id: "outmin",
      type: "number",
      defaultValue: 0,
    },
    {
      id: "outmax",
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

  codeBlockType: "expression",
  settings: [],
  ...changeTypeGenerator(portTypesWithTags(["common", "vector"], ["array"]), ["outmin", "outmax"], ["result"]),
  getData: (portId, nodeData, context) => {
    const t = context.getInputValueNumber(nodeData, "t");
    const inmin = context.getInputValueNumber(nodeData, "inmin");
    const inmax = context.getInputValueNumber(nodeData, "inmax");
    const outmin = context.getInputValueVector(nodeData, "outmin");
    const outmax = context.getInputValueVector(nodeData, "outmax");
    const clamp = context.getInputValueBoolean(nodeData, "clamp");
    const dt = (t - inmin) / (inmax - inmin);
    const result = vectorLerp(outmin, outmax, clamp ? Math.max(Math.min(dt, 1), 0) : dt);

    return enforceCorrectVectorTypeForNode(nodeData, result);
  },
  shaderRequirement: `float map(float n, float inmin, float inmax, float outmin, float outmax, bool c) {
      float dt = (n - inmin) / (inmax - inmin);
      float rr = c ? clamp(dt, 0.0, 1.0) : dt;
      return mix(outmin, outmax, rr);
}
vec2 map(float n, float inmin, float inmax, vec2 outmin, vec2 outmax, bool c) {
      float dt = (n - inmin) / (inmax - inmin);
      float rr = c ? clamp(dt, 0.0, 1.0) : dt;
      return mix(outmin, outmax, rr);
}
vec3 map(float n, float inmin, float inmax, vec3 outmin, vec3 outmax, bool c) {
      float dt = (n - inmin) / (inmax - inmin);
      float rr = c ? clamp(dt, 0.0, 1.0) : dt;
      return mix(outmin, outmax, rr);
}
vec4 map(float n, float inmin, float inmax, vec4 outmin, vec4 outmax, bool c) {
      float dt = (n - inmin) / (inmax - inmin);
      float rr = c ? clamp(dt, 0.0, 1.0) : dt;
      return mix(outmin, outmax, rr);
}
`,
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "result", ["t", "inmin", "inmax", "outmin", "outmax", "clamp"], ({ t, inmin, inmax, outmin, outmax, clamp }) => `map(${t}, ${inmin}, ${inmax}, ${outmin}, ${outmax}, ${clamp})`);
  },
};
