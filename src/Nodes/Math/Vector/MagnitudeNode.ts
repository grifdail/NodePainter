import { IconArrowUpRightCircle } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { portTypesWithTags } from "../../../Types/PortTypeDefinitions";
import { createVector2 } from "../../../Types/vectorDataType";
import { changeTypeGenerator } from "../../../Utils/graph/definition/changeTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../../Utils/graph/execution/generateShaderCodeFromNodeData";
import { vectorMagnitude } from "../../../Utils/math/vectorUtils";

export const MagnitudeNode: NodeDefinition = {
    id: "Math/Vector/Magnitude",
    description: "Return the length of a vector",
    alias: "Length Size Norm",
    icon: IconArrowUpRightCircle,
    tags: ["Vector"],
    dataInputs: [
        {
            id: "vec",
            type: "vector2",
            defaultValue: createVector2(),
        },
    ],
    dataOutputs: [
        {
            id: "length",
            type: "number",
            defaultValue: 0,
        },
    ],

    codeBlockType: "expression",
    settings: [],
    ...changeTypeGenerator(portTypesWithTags(["common", "vector"], ["array"]), ["vec"], []),
    getData: (portId, node, context) => {
        var vec = context.getInputValueVector(node, "vec");
        return vectorMagnitude(vec);
    },
    getShaderCode(node, context) {
        return generateShaderCodeFromNodeData(node, context, "length", ["vec"], ({ vec }) => `length(${vec})`);
    },
};
