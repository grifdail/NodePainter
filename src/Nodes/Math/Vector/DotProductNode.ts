import { IconArrowUpRightCircle } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { portTypesWithTags } from "../../../Types/PortTypeDefinitions";
import { createVector2 } from "../../../Types/vectorDataType";
import { changeTypeGenerator } from "../../../Utils/graph/definition/changeTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../../Utils/graph/execution/generateShaderCodeFromNodeData";
import { vectorDotProduct } from "../../../Utils/math/vectorUtils";

export const DotProductNode: NodeDefinition = {
    id: "Math/Vector/DotProduct",
    description: "Return the dot product of two vector",
    icon: IconArrowUpRightCircle,
    tags: ["Vector"],
    dataInputs: [
        {
            id: "a",
            type: "vector2",
            defaultValue: createVector2(),
        },
        {
            id: "b",
            type: "vector2",
            defaultValue: createVector2(),
        },
    ],
    dataOutputs: [
        {
            id: "dot",
            type: "number",
            defaultValue: 0,
        },
    ],

    codeBlockType: "expression",
    settings: [],
    ...changeTypeGenerator(portTypesWithTags(["common", "true-vector"], ["array"]), ["a", "b"], []),
    getData: (portId, node, context) => {
        var a = context.getInputValueVector(node, "a");
        var b = context.getInputValueVector(node, "b");
        return vectorDotProduct(a, b);
    },
    getShaderCode(node, context) {
        return generateShaderCodeFromNodeData(node, context, "dot", ["a", "b"], ({ a, b }) => `dot(${a}, ${b})`);
    },
};
