import { IconArrowUpRightCircle } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { portTypesWithTags } from "../../../Types/PortTypeDefinitions";
import { createVector3 } from "../../../Types/vectorDataType";
import { changeTypeGenerator } from "../../../Utils/graph/definition/changeTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../../Utils/graph/execution/generateShaderCodeFromNodeData";
import { vectorReflect } from "../../../Utils/math/vectorUtils";

export const ReflectNode: NodeDefinition = {
    id: "Math/Vector/Reflect",
    label: "Reflect Vector",
    description: "Reflect the vector A along a normal B",
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
    ...changeTypeGenerator(portTypesWithTags(["common", "true-vector"], ["array"]), ["a", "b"], ["out"]),
    getData: (portId, node, context) => {
        var a = context.getInputValueVector3(node, "a");
        var b = context.getInputValueVector3(node, "b");
        return vectorReflect(a, b);
    },
    getShaderCode(node, context) {
        return generateShaderCodeFromNodeData(node, context, "dot", ["a", "b"], ({ a, b }) => `dot(${a}, ${b})`);
    },
};
