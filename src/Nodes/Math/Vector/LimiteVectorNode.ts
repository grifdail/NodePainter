import { IconArrowUpRightCircle } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { portTypesWithTags } from "../../../Types/PortTypeDefinitions";
import { createVector2 } from "../../../Types/vectorDataType";
import { changeTypeGenerator } from "../../../Utils/graph/definition/changeTypeGenerator";
import { enforceCorrectVectorTypeForNode } from "../../../Utils/graph/execution/enforceCorrectVectorTypeForNode";
import { vectorLimitMagnitude } from "../../../Utils/math/vectorUtils";

export const LimitVectorNode: NodeDefinition = {
    id: "Math/Vector/Limite",
    alias: "clamp",
    description: "Limit a vector magnitude to be bellow or above a specific value",
    icon: IconArrowUpRightCircle,
    featureLevel: 80,
    tags: ["Math", "Vector"],
    dataInputs: [
        {
            id: "vec",
            type: "vector2",
            defaultValue: createVector2(),
        },
        {
            id: "magnitude",
            type: "number",
            defaultValue: 1,
        },
    ],
    dataOutputs: [
        {
            id: "out",
            type: "vector2",
            defaultValue: createVector2(),
        },
    ],

    codeBlockType: "expression",
    settings: [],
    ...changeTypeGenerator(portTypesWithTags(["common", "vector"], ["array"]), ["vec"], ["out"]),
    getData: (portId, nodeData, context) => {
        var a = context.getInputValueVector(nodeData, "vec");
        var magnitude = context.getInputValueNumber(nodeData, "magnitude");
        return enforceCorrectVectorTypeForNode(nodeData, vectorLimitMagnitude(a, magnitude));
    },/*
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "out", ["vec", "scale"], ({ vec, scale }) => `${vec} * ${scale}`);
  },*/
};
