import { IconColorFilter } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { generateShaderCodeFromNodeData } from "../../Utils/graph/execution/generateShaderCodeFromNodeData";
import { clamp01 } from "../../Utils/math/clamp01";
import { hslToRgb } from "../../Utils/math/colorUtils";
import { Constraints } from "../../Utils/ui/applyConstraints";

export const HSLNode: NodeDefinition = {
    id: "Color/HSL",
    description: "create a color from hue, saturation and lightness",
    icon: IconColorFilter,
    tags: ["Color"],
    dataInputs: [
        { id: "hue", type: "number", defaultValue: 0, constrains: [Constraints.Mod1()] },
        { id: "saturation", type: "number", defaultValue: 1, constrains: [Constraints.Clamp01()] },
        { id: "lightness", type: "number", defaultValue: 1, constrains: [Constraints.Clamp01()] },
        { id: "alpha", type: "number", defaultValue: 1, constrains: [Constraints.Clamp01()] },
    ],
    dataOutputs: [{ id: "color", type: "color", defaultValue: 1 }],

    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {
        var hue = context.getInputValueNumber(node, "hue");
        var saturation = context.getInputValueNumber(node, "saturation");
        var lightness = context.getInputValueNumber(node, "lightness");
        const alpha = context.getInputValueNumber(node, "alpha");
        return hslToRgb(hue % 1, clamp01(saturation), clamp01(lightness), alpha);
    },
    shaderRequirement: `
    vec3 hsl2rgb( in vec3 c )
{
    vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );

    return c.z + c.y * (rgb-0.5)*(1.0-abs(2.0*c.z-1.0));
}`,
    getShaderCode(node, context) {
        return generateShaderCodeFromNodeData(node, context, "color", ["hue", "saturation", "lightness", "alpha"], ({ hue, saturation, lightness, alpha }) => `vec4(hsl2rgb(vec3(${hue},${saturation},${lightness})),${alpha})`);
    },
};
