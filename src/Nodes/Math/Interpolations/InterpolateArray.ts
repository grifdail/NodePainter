import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { interpolateArray } from "../../../Types/PathData";
import { PortType } from "../../../Types/PortType";
import { PortTypeDefinitions, portTypesWithProperty } from "../../../Types/PortTypeDefinitions";
import { createVector2 } from "../../../Types/vectorDataType";
import { changeTypeGenerator } from "../../../Utils/graph/definition/changeTypeGenerator";

export const InterpolateArrayNode: NodeDefinition = {
    id: "Math/Interpolation/Array",
    label: "Interpolate Array",
    description: "interpolate between multiple value on array",
    icon: IconMathFunction,
    featureLevel: 50,
    tags: ["Math", "Vector", "Array"],
    dataInputs: [
        {
            id: "values",
            type: "array-vector2",
            defaultValue: [],
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
    ...changeTypeGenerator(portTypesWithProperty("lerpOperator"), [], ["result"], ["values"]),
    getData: (portId, node, context) => {
        const t = context.getInputValueNumber(node, "t");
        const values = context.getInputValue(node, "values", `array-${node.selectedType}` as PortType) as any[];
        const operator = PortTypeDefinitions[node.selectedType].lerpOperator;
        if (operator === undefined) {
            return PortTypeDefinitions[node.selectedType].createDefaultValue()
        }
        return interpolateArray(operator, values, t, PortTypeDefinitions[node.selectedType].createDefaultValue());
    }
};
