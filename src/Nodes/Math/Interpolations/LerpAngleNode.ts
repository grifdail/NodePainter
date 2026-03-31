import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { createVector2 } from "../../../Types/vectorDataType";
import { clamp, clamp01 } from "../../../Utils/math/clamp01";
const tau = Math.PI * 2;

export const LerpAngleNode: NodeDefinition = {
    id: "Math/Interpolation/LerpAngle",
    alias: "Mix",
    description: "interpolate between 2 angle, using the shortest path",
    icon: IconMathFunction,
    featureLevel: 50,
    tags: ["Math", "Vector"],
    dataInputs: [
        {
            id: "from",
            type: "number",
            defaultValue: 0,
        },
        {
            id: "to",
            type: "number",
            defaultValue: 1,
        },
        {
            id: "t",
            type: "number",
            defaultValue: 0.5,
        },
    ],
    dataOutputs: [
        {
            id: "result",
            type: "vector2",
            defaultValue: createVector2(),
        },
    ],

    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {
        const t = context.getInputValueNumber(node, "t");
        const a = context.getInputValueNumber(node, "from");
        const b = context.getInputValueNumber(node, "to");
        const tdelta = b - a

        let delta = clamp(tdelta - Math.floor(tdelta / tau) * tau, 0.0, tau);
        if (delta > Math.PI)
            delta -= tau;
        return a + delta * clamp01(t);
    },

};
