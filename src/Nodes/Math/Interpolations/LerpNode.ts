import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { PortTypeDefinitions, portTypesWithProperty } from "../../../Types/PortTypeDefinitions";
import { createVector2 } from "../../../Types/vectorDataType";
import { changeTypeGenerator } from "../../../Utils/graph/definition/changeTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../../Utils/graph/execution/generateShaderCodeFromNodeData";

export const LerpNode: NodeDefinition = {
    id: "Math/Interpolation/Lerp",
    alias: "Mix",
    description: "interpolate between 2 vector",
    icon: IconMathFunction,
    featureLevel: 50,
    tags: ["Math", "Vector"],
    dataInputs: [
        {
            id: "from",
            type: "vector2",
            defaultValue: createVector2(),
        },
        {
            id: "to",
            type: "vector2",
            defaultValue: createVector2(),
        },
        {
            id: "t",
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
    ...changeTypeGenerator(portTypesWithProperty("lerpOperator"), ["from", "to"], ["result"]),
    getData: (portId, node, context) => {
        const t = context.getInputValueNumber(node, "t");
        const a = context.getInputValue(node, "from", node.selectedType);
        const b = context.getInputValue(node, "to", node.selectedType);
        const operator = PortTypeDefinitions[node.selectedType].lerpOperator;
        return operator ? operator(a, b, t) : PortTypeDefinitions[node.selectedType].createDefaultValue();
    },
    getShaderCode(node, context) {
        return generateShaderCodeFromNodeData(node, context, "result", ["from", "to", "t"], ({ from, to, t }) => `mix(${from}, ${to}, ${t})`);
    },
};
