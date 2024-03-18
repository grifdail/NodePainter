import { IconColorFilter } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { genShader } from "../../Utils/genShader";
import { clamp01, hsvToRgb } from "../../Utils/colorUtils";

export const HSV: NodeDefinition = {
  id: "HSV",
  description: "create a color from hue, saturation and value",
  icon: IconColorFilter,
  tags: ["Color"],
  dataInputs: [
    { id: "hue", type: "number", defaultValue: 0 },
    { id: "saturation", type: "number", defaultValue: 1 },
    { id: "value", type: "number", defaultValue: 1 },
  ],
  dataOutputs: [{ id: "color", type: "color", defaultValue: 1 }],
  executeOutputs: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    const hue = context.getInputValueNumber(nodeData, "hue");
    const saturation = context.getInputValueNumber(nodeData, "saturation");
    const value = context.getInputValueNumber(nodeData, "value");
    return hsvToRgb(hue % 1, clamp01(saturation), clamp01(value));
  },
  shaderRequirement: `vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}`,
  getShaderCode(node, context) {
    return genShader(node, context, "color", ["hue", "saturation", "value"], ({ hue, saturation, value }) => `vec4(hsv2rgb(vec3(${hue},${saturation},${value})),1.0)`);
  },
};
