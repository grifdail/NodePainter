import { IconAngle } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { generateShaderCodeFromNodeData } from "../../../Utils/graph/execution/generateShaderCodeFromNodeData";

export const Atan2Node: NodeDefinition = {
    id: "Math/Trigonometry/Atan2",
    tags: ["Math"],
    icon: IconAngle,
    description: "Return the angle formed by the given coordinate and the horizontal axis.",
    dataInputs: [
        {
            id: "y",
            type: "number",
            defaultValue: 0,
        },
        {
            id: "x",
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
        if (portId === "result") {
            var a = context.getInputValueNumber(node, "y");
            var b = context.getInputValueNumber(node, "x");
            return Math.atan2(a, b);
        }
    },
    shaderRequirement: `
    float atan2(in float y, in float x)
{
    bool s = (abs(x) > abs(y));
    return mix(PI/2.0 - atan(x,y), atan(y,x), s);
}
`,
    getShaderCode(node, context) {
        return generateShaderCodeFromNodeData(node, context, "result", ["x", "y"], ({ x, y }) => `atan2(${y}, ${x})`);
    },
};
