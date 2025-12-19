import { IconColorFilter } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { createDefaultGradient, Gradient } from "../../../Types/vectorDataType";

export const GradientNode: NodeDefinition = {
    id: "Color/Gradient/Gradient",
    description: "Create a manualy defined gradient",
    icon: IconColorFilter,
    tags: ["Color"],
    dataInputs: [],
    dataOutputs: [{ id: "gradient", type: "gradient", defaultValue: createDefaultGradient() }],

    settings: [{ id: "gradient", type: "gradient", defaultValue: createDefaultGradient() }],
    getData: (portId, node, context) => {
        return node.settings.gradient;
    },
    contextMenu: {
        "Space evenly": (node) => {
            var gradient = node.settings.gradient as Gradient;
            gradient.forEach((stop, i) => {
                stop.pos = i / (gradient.length - 1);
            });
        },
    },
};
