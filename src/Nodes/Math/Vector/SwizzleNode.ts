import { IconMathXy } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { PortTypeDefinitions, portTypesWithTags } from "../../../Types/PortTypeDefinitions";
import { createVector2 } from "../../../Types/vectorDataType";
import { changeTypeGenerator } from "../../../Utils/graph/definition/changeTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../../Utils/graph/execution/generateShaderCodeFromNodeData";
import { performSwizzle } from "../../../Utils/math/swizzle/PerformSwizzle";
import { Constraints } from "../../../Utils/ui/applyConstraints";

export const SwizzleNode: NodeDefinition = {
    id: "Math/Vector/Swizzle",
    description: "Reorder vector components",
    icon: IconMathXy,
    featureLevel: 80,
    tags: ["Math", "Vector"],
    dataInputs: [
        {
            id: "vec",
            type: "vector2",
            defaultValue: createVector2(),
        },
    ],
    dataOutputs: [
        {
            id: "out",
            type: "vector2",
            defaultValue: createVector2(),
        },
    ],

    settings: [{ id: "swizzle", type: "string", defaultValue: "xyz", constrains: [Constraints.SwizzleString()] }],
    ...changeTypeGenerator([...portTypesWithTags(["common", "true-vector"], ["array"]), "vector4", "quaternion"], ["vec"], ["out"]),
    getData: (portId, node, context) => {
        var a = context.getInputValueVector(node, "vec");
        var vectorLength = PortTypeDefinitions[node.selectedType].vectorLength || 3;
        return performSwizzle(a, node.settings.swizzle, vectorLength);
    },
    getShaderCode(node, context) {
        return generateShaderCodeFromNodeData(node, context, "out", ["vec", "scale"], ({ vec, scale }) => `${vec} * ${scale}`);
    },
};
