import { IconMathXPlusY } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { portTypesWithTags } from "../../../Types/PortTypeDefinitions";
import { createVector2 } from "../../../Types/vectorDataType";
import { changeTypeGenerator } from "../../../Utils/graph/definition/changeTypeGenerator";

export const ChebyshevDistance: NodeDefinition = {
    id: "Math/Vector/ChebyshevDistance",
    description: "Return the maximum of the distance of each coordinate",
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
        return a.reduce((acc, _, i) => Math.max(acc, Math.abs(a[i] - b[i])), 0);
    },
};
