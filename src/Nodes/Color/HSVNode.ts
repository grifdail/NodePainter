import { IconColorFilter } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { generateShaderCodeFromNodeData } from "../../Utils/graph/execution/generateShaderCodeFromNodeData";
import { clamp01 } from "../../Utils/math/clamp01";
import { hsvToRgb } from "../../Utils/math/colorUtils";
import { Constraints } from "../../Utils/ui/applyConstraints";

export const HSVNode: NodeDefinition = {
  id: "Color/HSV",
  description: "create a color from hue, saturation and value",
  icon: IconColorFilter,
  tags: ["Color"],
  dataInputs: [
    { id: "hue", type: "number", defaultValue: 0, constrains: [Constraints.Mod1()] },
    { id: "saturation", type: "number", defaultValue: 1, constrains: [Constraints.Clamp01()] },
    { id: "value", type: "number", defaultValue: 1, constrains: [Constraints.Clamp01()] },
    { id: "alpha", type: "number", defaultValue: 1, constrains: [Constraints.Clamp01()] },
  ],
  dataOutputs: [{ id: "color", type: "color", defaultValue: 1 }],

  codeBlockType: "expression",
  settings: [],
  getData: (portId, nodeData, context) => {
    const hue = context.getInputValueNumber(nodeData, "hue");
    const saturation = context.getInputValueNumber(nodeData, "saturation");
    const value = context.getInputValueNumber(nodeData, "value");
    const alpha = context.getInputValueNumber(nodeData, "alpha");
    return hsvToRgb(hue % 1, clamp01(saturation), clamp01(value), alpha);
  },
  shaderRequirement: `vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}`,
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "color", ["hue", "saturation", "value", "alpha"], ({ hue, saturation, value, alpha }) => `vec4(hsv2rgb(vec3(${hue},${saturation},${value})),${alpha})`);
  },
};
