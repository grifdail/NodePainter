import { IconColorFilter } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { clamp01, hslToRgb } from "../../Utils/colorUtils";
import { generateShaderCodeFromNodeData } from "../../Utils/generateShaderCodeFromNodeData";

export const HSL: NodeDefinition = {
  id: "HSL",
  description: "create a color from hue, saturation and lightness",
  icon: IconColorFilter,
  tags: ["Color"],
  dataInputs: [
    { id: "hue", type: "number", defaultValue: 0 },
    { id: "saturation", type: "number", defaultValue: 1 },
    { id: "lightness", type: "number", defaultValue: 1 },
  ],
  dataOutputs: [{ id: "color", type: "color", defaultValue: 1 }],
  executeOutputs: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    var hue = context.getInputValueNumber(nodeData, "hue");
    var saturation = context.getInputValueNumber(nodeData, "saturation");
    var lightness = context.getInputValueNumber(nodeData, "lightness");
    return hslToRgb(hue % 1, clamp01(saturation), clamp01(lightness));
  },
  shaderRequirement: `
    vec3 hsl2rgb( in vec3 c )
{
    vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );

    return c.z + c.y * (rgb-0.5)*(1.0-abs(2.0*c.z-1.0));
}`,
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "color", ["hue", "saturation", "lightness"], ({ hue, saturation, lightness }) => `vec4(hsl2rgb(vec3(${hue},${saturation},${lightness})),1.0)`);
  },
};
