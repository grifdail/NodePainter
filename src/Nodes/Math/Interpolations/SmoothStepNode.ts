import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { generateShaderCodeFromNodeData } from "../../../Utils/graph/execution/generateShaderCodeFromNodeData";

export const SmoothStepNode: NodeDefinition = {
    id: "Math/Interpolation/SmoothStep",
    description: "Smoothly interpolate between 0 and 1",
    icon: IconMathFunction,
    tags: ["Math"],
    dataInputs: [
        {
            id: "min",
            type: "number",
            defaultValue: 0,
        },
        {
            id: "max",
            type: "number",
            defaultValue: 1,
        },
        {
            id: "input",
            type: "number",
            defaultValue: 0,
        },
    ],
    dataOutputs: [
        {
            id: "out",
            type: "number",
            defaultValue: 0,
        },
    ],

    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {
        const min = context.getInputValueNumber(node, "min");
        const max = context.getInputValueNumber(node, "max");
        const value = context.getInputValueNumber(node, "input");
        const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
        return x * x * (3 - 2 * x);
    },
    getShaderCode(node, context) {
        return generateShaderCodeFromNodeData(node, context, "out", ["input", "min", "max"], ({ input, min, max }) => `smoothstep(${min}, ${max}, ${input})`);
    },
};
