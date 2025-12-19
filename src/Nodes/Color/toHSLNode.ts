import { IconColorFilter } from "@tabler/icons-react";
import convert from "color-convert";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";

export const ToHSLNode: NodeDefinition = {
    id: "Color/ToHSL",
    description: "Convert a color to HSL",
    icon: IconColorFilter,
    tags: ["Color"],
    dataInputs: [Port.color("color")],
    dataOutputs: [Port.number("hue"), Port.number("saturation"), Port.number("lightness"), Port.number("alpha")],
    settings: [],
    getData: (portId, node, context) => {
        const color = context.getInputValueColor(node, "color");
        var hsl = convert.rgb.hsl(color[0] * 255, color[1] * 255, color[2] * 255);
        if (portId === "hue") {
            return hsl[0];
        }
        if (portId === "saturation") {
            return hsl[1];
        }
        if (portId === "lightness") {
            return hsl[2];
        }
        if (portId === "alpha") {
            return color[3];
        }
    },
};
