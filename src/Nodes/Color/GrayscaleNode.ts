import { IconColorFilter } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";

export const Grayscale: NodeDefinition = {
    id: "Color/Grayscale",
    alias: "Greyscale",
    description: "Get the average value of a color",
    icon: IconColorFilter,
    tags: ["Color"],
    dataInputs: [Port.color("color")],
    dataOutputs: [Port.number("value")],
    settings: [],
    getData: (portId, node, context) => {
        const color = context.getInputValueColor(node, "color");
        return (color[0] + color[1] + color[2]) / 3;
    },
};

