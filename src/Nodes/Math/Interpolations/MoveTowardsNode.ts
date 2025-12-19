import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { portTypesWithTags } from "../../../Types/PortTypeDefinitions";
import { createVector2 } from "../../../Types/vectorDataType";
import { changeTypeGenerator } from "../../../Utils/graph/definition/changeTypeGenerator";
import { enforceCorrectVectorTypeForNode } from "../../../Utils/graph/execution/enforceCorrectVectorTypeForNode";
import { generateShaderCodeFromNodeData } from "../../../Utils/graph/execution/generateShaderCodeFromNodeData";
import { vectorAddition, vectorLimitMagnitude, vectorSubstraction } from "../../../Utils/math/vectorUtils";

export const MoveTowardsNode: NodeDefinition = {
    id: "Math/Interpolation/MoveTowards",
    description: "Move a value toward a target at a specific speed",
    icon: IconMathFunction,
    featureLevel: 50,
    tags: ["Math", "Vector"],
    dataInputs: [
        {
            id: "current",
            type: "vector2",
            defaultValue: createVector2(),
        },
        {
            id: "target",
            type: "vector2",
            defaultValue: createVector2(),
        },
        {
            id: "speed",
            type: "number",
            defaultValue: 0.5,
        },
    ],
    dataOutputs: [
        {
            id: "result",
            type: "vector2",
            defaultValue: createVector2(),
        },
    ],

    codeBlockType: "expression",
    settings: [],
    ...changeTypeGenerator(portTypesWithTags(["vector", "common"], ["array"]), ["current", "target"], ["result"]),
    getData: (portId, node, context) => {
        const speed = context.getInputValueNumber(node, "speed");
        const current = context.getInputValueVector(node, "current");
        const target = context.getInputValueVector(node, "target");
        const delta = vectorSubstraction(target, current);
        const displacement = vectorLimitMagnitude(delta, speed);
        return enforceCorrectVectorTypeForNode(node, vectorAddition(current, displacement))
    },
    getShaderCode(node, context) {
        return generateShaderCodeFromNodeData(node, context, "result", ["from", "to", "t"], ({ from, to, t }) => `mix(${from}, ${to}, ${t})`);
    },
};
