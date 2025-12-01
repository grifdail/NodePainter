import { IconLine } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { createVector2, Vector2 } from "../../../Types/vectorDataType";
import { vector2Perpendicular, vectorAddition, vectorDistance, vectorDotProduct, vectorScale, vectorSubstraction } from "../../../Utils/math/vectorUtils";

export const CircumcircleNode: NodeDefinition = {
    id: "Math/Geometry/Circumcircle",
    alias: "Triangle's Circumcircle",
    description: "Find the circle that pass through all 3 vertice of the triangle",
    icon: IconLine,
    featureLevel: 50,
    tags: ["Math"],
    dataInputs: [
        Port.vector2("a", createVector2(0, 0)),
        Port.vector2("b", createVector2(400, 400)),
        Port.vector2("c", createVector2(400, 0)),

    ],
    dataOutputs: [
        Port.vector2("center"),
        Port.number("radius"),
    ],
    settings: [],
    codeBlockType: "expression",
    getData: (portId, nodeData, context) => {
        const a = context.getInputValueVector2(nodeData, "a");
        const b = context.getInputValueVector2(nodeData, "b");
        const c = context.getInputValueVector2(nodeData, "c");
        var result = CircumcircleNode.fn?.(a, b, c) || { center: createVector2(), radius: 0 };

        return result[portId];

    },
    fn: (a: Vector2, b: Vector2, c: Vector2) => {
        let v1 = vectorSubstraction(c, b) as Vector2;
        let v2 = vectorSubstraction(a, c) as Vector2;
        let v3 = vectorSubstraction(b, a) as Vector2;
        let v4 = vector2Perpendicular(v3);
        let v = vectorAddition(vectorScale(vectorAddition(vectorScale(v4, (vectorDotProduct(v1, v2) / vectorDotProduct(v4, v2))), v3), 0.5), a);
        return {
            center: v,
            radius: vectorDistance(v, a)
        }
    },
};
