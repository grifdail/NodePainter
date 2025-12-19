import { IconLine } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { createVector2 } from "../../../Types/vectorDataType";

export const PointInRectNode: NodeDefinition = {
    id: "Math/Geometry/PointInRect",
    label: "Point in Rect",
    description: "Return true if the target point is in the rectangle",
    icon: IconLine,
    featureLevel: 50,
    tags: ["Math"],
    dataInputs: [
        Port.vector2("target", createVector2(0, 0)),
        Port.vector2("rectangleOrigin", createVector2(100, 100)),
        Port.vector2("rectangleDimension", createVector2(200, 200)),

    ],
    dataOutputs: [
        Port.bool("result"),
    ],
    settings: [],
    codeBlockType: "expression",
    getData: (portId, node, context) => {
        const target = context.getInputValueVector2(node, "target");
        const rectangleOrigin = context.getInputValueVector2(node, "rectangleOrigin");
        const rectangleDimension = context.getInputValueVector2(node, "rectangleDimension");
        return PointInRectNode.fn?.(target, rectangleOrigin, rectangleDimension);

    },
    fn: function newFunction(target, rectangleOrigin, rectangleDimension): any {
        return target[0] > rectangleOrigin[0] &&
            target[0] < rectangleOrigin[0] + rectangleDimension[0] &&
            target[1] > rectangleOrigin[1] &&
            target[1] < rectangleOrigin[1] + rectangleDimension[1];
    },
};


