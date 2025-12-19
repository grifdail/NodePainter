import { IconArrowUpRightCircle } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { createVector3 } from "../../../Types/vectorDataType";
import { generateShaderCodeFromNodeData } from "../../../Utils/graph/execution/generateShaderCodeFromNodeData";
import { vectorCrossProduct } from "../../../Utils/math/vectorUtils";

export const CrossProductNode: NodeDefinition = {
    id: "Math/Vector/CrossProduct",
    description: "Return the dot product of two vector",
    icon: IconArrowUpRightCircle,
    tags: ["Vector"],
    dataInputs: [
        {
            id: "a",
            type: "vector3",
            defaultValue: createVector3(),
        },
        {
            id: "b",
            type: "vector3",
            defaultValue: createVector3(),
        },
    ],
    dataOutputs: [
        {
            id: "out",
            type: "vector3",
            defaultValue: createVector3(),
        },
    ],

    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {
        var a = context.getInputValueVector3(node, "a");
        var b = context.getInputValueVector3(node, "b");
        return vectorCrossProduct(a, b);
    },
    getShaderCode(node, context) {
        return generateShaderCodeFromNodeData(node, context, "dot", ["a", "b"], ({ a, b }) => `dot(${a}, ${b})`);
    },
};
