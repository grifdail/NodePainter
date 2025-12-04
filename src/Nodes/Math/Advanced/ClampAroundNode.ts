import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { generateShaderCodeFromNodeData } from "../../../Utils/graph/execution/generateShaderCodeFromNodeData";

export const ClampAroundNode: NodeDefinition = {
    id: "Math/Advanced/ClampAround",
    tags: ["Math"],
    label: "Clamp Around",
    icon: IconMathFunction,
    description: "Constrain a number to in a certain range of a target value",
    featureLevel: 5,
    codeBlockType: "expression",
    dataInputs: [
        {
            id: "value",
            type: "number",
            defaultValue: 0,
        },
        {
            id: "target",
            type: "number",
            defaultValue: 0,
        },
        {
            id: "range",
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

    settings: [],
    getData: (portId, nodeData, context) => {
        if (portId === "result") {
            var value = context.getInputValueNumber(nodeData, "value");
            var target = context.getInputValueNumber(nodeData, "target");
            var range = context.getInputValueNumber(nodeData, "range");
            return Math.max(Math.min(value, target + range), target - range)
        }
    },
    getShaderCode(node, context) {
        return generateShaderCodeFromNodeData(node, context, "result", ["value", "target", "range"], ({ value, target, range }) => `clamp(${value}, ${target} - ${range}, ${target} + ${range})`);
    },
};
