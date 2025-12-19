import { IconColorFilter } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { generateShaderCodeFromNodeData } from "../../Utils/graph/execution/generateShaderCodeFromNodeData";
import { White } from "../../Utils/math/colorUtils";
import { Constraints } from "../../Utils/ui/applyConstraints";

export const SetAlphaNode: NodeDefinition = {
    id: "Color/SetAlpha",
    label: "Set Alpha",
    description: "Set the transparency of a color",
    icon: IconColorFilter,
    tags: ["Color"],
    dataInputs: [
        { id: "color", type: "color", defaultValue: White() },
        { id: "alpha", type: "number", defaultValue: 0, constrains: [Constraints.Clamp01()] },
    ],
    dataOutputs: [{ id: "out", type: "color", defaultValue: 1 }],

    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {
        const color = context.getInputValueColor(node, "color");
        const alpha = context.getInputValueNumber(node, "alpha");
        return [color[0], color[1], color[2], alpha];
    },
    getShaderCode(node, context) {
        return generateShaderCodeFromNodeData(node, context, "out", ["color", "alpha"], ({ color, alpha }) => `vec4(${color}.rgb, ${alpha})`);
    },
};
