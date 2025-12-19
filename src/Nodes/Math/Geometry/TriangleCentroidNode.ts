import { IconLine } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { createVector2, Vector2 } from "../../../Types/vectorDataType";

export const TriangleCentroidNode: NodeDefinition = {
    id: "Math/Geometry/TriangleCentroid",
    alias: "Triangle Centroid",
    description: "Find the centroid of the triangle",
    icon: IconLine,
    featureLevel: 50,
    tags: ["Math"],
    dataInputs: [
        Port.vector2("a", createVector2(0, 0)),
        Port.vector2("b", createVector2(400, 400)),
        Port.vector2("c", createVector2(400, 0)),

    ],
    dataOutputs: [
        Port.vector2("centroid"),
    ],
    settings: [],
    codeBlockType: "expression",
    getData: (portId, nodeData, context) => {
        const a = context.getInputValueVector2(nodeData, "a");
        const b = context.getInputValueVector2(nodeData, "b");
        const c = context.getInputValueVector2(nodeData, "c");
        var result = TriangleCentroidNode.fn?.(a, b, c) || createVector2();

        return result;

    },
    fn: (a: Vector2, b: Vector2, c: Vector2) => {
        let x = (a[0] + b[0] + c[0]) / 3;
        let y = (a[1] + b[1] + c[1]) / 3;
        return createVector2(x, y);
    },
};
