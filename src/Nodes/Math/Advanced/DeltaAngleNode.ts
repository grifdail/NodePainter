import { IconMathMax } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { clamp } from "../../../Utils/math/clamp01";

export const DeltaAngleNode: NodeDefinition = {
    id: "Math/Advanced/DeltaAngle",
    tags: ["Math"],
    icon: IconMathMax,
    description: "Return the shortest angle between the two input in radians",
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
        const value = (b - a + Math.PI)
        return clamp(value - Math.floor(value / Math.PI * 2) * Math.PI * 2, 0.0, Math.PI * 2) - Math.PI;
    },
};
