import { IconMathXPlusY } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { portTypesWithTags } from "../../../Types/PortTypeDefinitions";
import { createVector2 } from "../../../Types/vectorDataType";
import { changeTypeGenerator } from "../../../Utils/graph/definition/changeTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../../Utils/graph/execution/generateShaderCodeFromNodeData";
import { vectorDistance } from "../../../Utils/math/vectorUtils";

export const DistanceNode: NodeDefinition = {
    id: "Math/Vector/Distance",
    description: "Return the distance between two value",
    icon: IconMathXPlusY,
    featureLevel: 90,
    tags: ["Math", "Vector"],
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
            id: "out",
            type: "number",
            defaultValue: 0,
        },
    ],

    codeBlockType: "expression",
    settings: [],
    ...changeTypeGenerator(portTypesWithTags(["common", "vector"], ["array"]), ["a", "b"], []),
    getData: (portId, node, context) => {
        var a = context.getInputValueVector(node, "a");
        var b = context.getInputValueVector(node, "b");
        return vectorDistance(a, b);
    },
    getShaderCode(node, context) {
        return generateShaderCodeFromNodeData(node, context, "out", ["a", "b"], ({ a, b }) => `(${a} - ${b}).length`);
    },
};
