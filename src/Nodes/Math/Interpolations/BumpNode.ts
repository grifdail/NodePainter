import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../../Utils/graph/execution/generateShaderCodeFromNodeData";
import { clamp01 } from "../../../Utils/math/clamp01";

export const BumpNode: NodeDefinition = {
    id: "Math/Interpolation/Bump",
    description: "Evaluate the input against a bump curve in the range 0 to 1",
    icon: IconMathFunction,
    tags: ["Math"],
    dataInputs: [Port.number("input")],
    dataOutputs: [
        {
            id: "out",
            type: "number",
            defaultValue: 0,
        },
    ],

    codeBlockType: "expression",
    settings: [],
    getData: (portId, nodeData, context) => {
        const x = context.getInputValueNumber(nodeData, "input");
        const tx = clamp01(x) * 2 - 1
        return Math.max(1 - tx * tx, 0);
    },
    getShaderCode(node, context) {
        return generateShaderCodeFromNodeData(node, context, "out", ["input"], ({ input }) => `max(1.0 - clamp(${input} * 2.0 -1.0, 0.0,1.0) * clamp(${input} * 2.0 -1.0, 0.0,1.0), 1.0)`);
    },
};
