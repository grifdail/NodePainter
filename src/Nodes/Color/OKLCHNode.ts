import { IconColorFilter } from "@tabler/icons-react";
import convert from "color-convert";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createColor } from "../../Types/vectorDataType";
import { Constraints } from "../../Utils/ui/applyConstraints";

export const OKLCHNode: NodeDefinition = {
    id: "Color/OKLCH",
    description: "create a color from perception based Lightness, chroma and hue",
    icon: IconColorFilter,
    tags: ["Color"],
    dataInputs: [
        { id: "lightness", type: "number", defaultValue: 50, constrains: [Constraints.Clamp(0, 100)] },
        { id: "chroma", type: "number", defaultValue: 32, constrains: [Constraints.Clamp(0, 32)] },
        { id: "hue", type: "number", defaultValue: 0, constrains: [Constraints.Clamp(0, 360)] },
        { id: "alpha", type: "number", defaultValue: 1, constrains: [Constraints.Clamp01()] },
    ],
    dataOutputs: [{ id: "color", type: "color", defaultValue: 1 }],

    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {
        var hue = context.getInputValueNumber(node, "hue");
        var chroma = context.getInputValueNumber(node, "chroma");
        var lightness = context.getInputValueNumber(node, "lightness");
        const alpha = context.getInputValueNumber(node, "alpha");
        var result = (convert as any).oklch.rgb(lightness, chroma, hue);
        return createColor(result[0] / 255, result[1] / 255, result[2] / 255, alpha);
    },
};
