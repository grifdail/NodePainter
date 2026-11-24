import { IconColorFilter } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { Color } from "../../Types/vectorDataType";

export const Luminance: NodeDefinition = {
    id: "Color/Luminance",
    description: "Get the luminosity value of a color",
    icon: IconColorFilter,
    tags: ["Color"],
    dataInputs: [Port.color("color")],
    dataOutputs: [Port.number("lum")],
    settings: [],
    getData: (portId, node, context) => {
        const color = context.getInputValueColor(node, "color");
        return luminance(color);
    },
};

function luminance(color: Color) {
    var rgb = color.slice(0, 3);
    var lum = [];

    for (var i = 0; i < rgb.length; i++) {
        var chan = rgb[i];
        lum[i] = (chan <= 0.03928) ? chan / 12.92 : Math.pow(((chan + 0.055) / 1.055), 2.4);
    }

    return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
};
