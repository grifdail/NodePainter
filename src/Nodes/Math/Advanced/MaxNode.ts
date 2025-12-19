import { IconMathMax } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";

export const MaxNode: NodeDefinition = {
    id: "Math/Advanced/Max",
    tags: ["Math"],
    icon: IconMathMax,
    description: "Returne the biggest of two number.",
    dataInputs: [
        {
            id: "a",
            type: "number",
            defaultValue: 0,
        },
        {
            id: "b",
            type: "number",
            defaultValue: 0,
        },
    ],
    dataOutputs: [
        {
            id: "result",
            type: "number",
            defaultValue: 0,
        },
    ],

    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {
        const a = context.getInputValueNumber(node, "a");
        const b = context.getInputValueNumber(node, "b");
        return Math.max(a, b);
    },
};
