import { IconColorFilter } from "@tabler/icons-react";
import convert from "color-convert";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";

export const ToHSVNode: NodeDefinition = {
    id: "Color/ToHSV",
    description: "Convert a color to HSV",
    icon: IconColorFilter,
    tags: ["Color"],
    dataInputs: [Port.color("color")],
    dataOutputs: [Port.number("hue"), Port.number("saturation"), Port.number("value"), Port.number("alpha")],
    settings: [],
    getData: (portId, node, context) => {
        const color = context.getInputValueColor(node, "color");
        var hsv = convert.rgb.hsv.raw(color[0] * 255, color[1] * 255, color[2] * 255);
        if (portId === "hue") {
            return hsv[0] / 360;
        }
        if (portId === "saturation") {
            return hsv[1] / 100;
        }
        if (portId === "value") {
            return hsv[2] / 100;
        }
        if (portId === "alpha") {
            return color[3];
        }
    },
    shaderRequirement: `vec3 rgb2hsv(vec3 c)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}`,
    getShaderCode(node, context) {
        return `
    vec3 ${context.getShaderVar(node, "temp", "vector3", true)} = time / 1000.0;
    `;
    },
};
