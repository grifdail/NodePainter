import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { portTypesWithTags } from "../../../Types/PortTypeDefinitions";
import { changeTypeGenerator } from "../../../Utils/graph/definition/changeTypeGenerator";
import { enforceCorrectVectorTypeForNode } from "../../../Utils/graph/execution/enforceCorrectVectorTypeForNode";
import { generateShaderCodeFromNodeData } from "../../../Utils/graph/execution/generateShaderCodeFromNodeData";

export const RoundNode: NodeDefinition = {
    id: "Math/Advanced/Round",
    description: "Round down a number to the nearest interger.",
    icon: IconMathFunction,
    tags: ["Math", "Vector"],
    dataInputs: [
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
    ...changeTypeGenerator(portTypesWithTags(["common", "vector"], ["array"]), ["input"], ["out"]),
    getData: (portId, node, context) => {
        var a = context.getInputValueVector(node, "input");
        return enforceCorrectVectorTypeForNode(
            node,
            a.map((value) => Math.round(value))
        );
    },
    getShaderCode(node, context) {
        return generateShaderCodeFromNodeData(node, context, "out", ["input"], ({ input }) => `sign(${input})*floor(abs(${input})+0.5);`);
    },
};
