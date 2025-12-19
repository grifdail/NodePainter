import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { generateShaderCodeFromNodeData } from "../../../Utils/graph/execution/generateShaderCodeFromNodeData";
import { clamp01 } from "../../../Utils/math/clamp01";
import { Constraints } from "../../../Utils/ui/applyConstraints";

export const StepNode: NodeDefinition = {
    id: "Math/Advanced/Step",
    alias: "Posterize",
    tags: ["Math"],
    icon: IconMathFunction,
    description: "Constrain a number between 0 and 1 to a specific number of discreet step.",
    dataInputs: [
        {
            id: "value",
            type: "number",
            defaultValue: 0,
        },
        {
            id: "step",
            type: "number",
            defaultValue: 0,
            constrains: [Constraints.Integer(), Constraints.Positive()],
        },
    ],
    dataOutputs: [
        {
            id: "result",
            type: "number",
            defaultValue: 5,
        },
    ],

    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {
        if (portId === "result") {
            var value = context.getInputValueNumber(node, "value");
            var step = context.getInputValueNumber(node, "step");
            return Math.floor(clamp01(value) * step) / step;
        }
    },
    getShaderCode(node, context) {
        return generateShaderCodeFromNodeData(node, context, "result", ["value", "step"], ({ value, step }) => `floor(clamp(${value},0.0, 1.0) * ${step}) / ${step}`);
    },
};
