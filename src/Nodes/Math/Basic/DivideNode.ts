import { IconDivide } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { PortTypeDefinitions, portTypesWithProperty } from "../../../Types/PortTypeDefinitions";
import { createVector2 } from "../../../Types/vectorDataType";
import { changeTypeGenerator } from "../../../Utils/graph/definition/changeTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../../Utils/graph/execution/generateShaderCodeFromNodeData";

export const DivideNode: NodeDefinition = {
    id: "Math/Basic/Division",
    description: "Divide each component of two vector together",
    icon: IconDivide,
    tags: ["Math", "Vector"],
    dataInputs: [
        {
            id: "a",
            type: "vector2",
            defaultValue: createVector2(1, 1),
        },
        {
            id: "b",
            type: "vector2",
            defaultValue: createVector2(1, 1),
        },
    ],
    dataOutputs: [
        {
            id: "out",
            type: "vector2",
            defaultValue: createVector2(1, 1),
        },
    ],

    settings: [],
    ...changeTypeGenerator(portTypesWithProperty("divisionOperator"), ["a", "b"], ["out"]),
    getData: (portId, node, context) => {
        var a = context.getInputValueVector(node, "a");
        var b = context.getInputValueVector(node, "b");
        const operator = PortTypeDefinitions[node.selectedType].divisionOperator;
        if (operator) {
            return operator(a, b);
        } else {
            return PortTypeDefinitions[node.selectedType].createDefaultValue();
        }
    },
    getShaderCode(node, context) {
        return generateShaderCodeFromNodeData(node, context, "out", ["a", "b"], ({ a, b }) => `${a} / ${b}`);
    },
};
