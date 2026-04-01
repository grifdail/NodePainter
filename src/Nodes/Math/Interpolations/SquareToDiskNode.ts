import { IconMathXPlusY } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { createVector2 } from "../../../Types/vectorDataType";
import { clamp } from "../../../Utils/math/clamp01";

export const SquareToDiskNode: NodeDefinition = {
    id: "Math/Vector/SquareToDisk",
    description: "Given a position within a -1 to 1 square, remaps it to the unit circle",
    icon: IconMathXPlusY,
    featureLevel: 90,
    tags: ["Math", "Vector"],
    dataInputs: [
        {
            id: "pos",
            type: "vector2",
            defaultValue: createVector2(),
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
        const pos = context.getInputValueVector(node, "pos");
        const x = clamp(pos[0], -1, 1);
        const y = clamp(pos[1], -1, 1);
        const u = x * Math.sqrt(1 - (y * y) / 2);
        const v = y * Math.sqrt(1 - (x * x) / 2);
        return createVector2(u, v);
    },
};
