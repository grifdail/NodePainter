import { IconVectorBezier2 } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { Vector2 } from "../../Types/vectorDataType";
import { toP5Color } from "../../Utils/math/colorUtils";

export const SplineNode: NodeDefinition = {
    id: "Draw/Spline",
    label: "Draw Spline",
    description: "Draw a spline composed of multiple bezier curve",
    icon: IconVectorBezier2,
    tags: ["Drawing"],
    dataInputs: [
        {
            id: "color",
            type: "color",
            defaultValue: [0, 0, 0, 1],
        },
        {
            id: "lineWidth",
            type: "number",
            defaultValue: 10,
        },
        Port["array-vector2"]("spline")
    ],
    dataOutputs: [Port.drawing2d("out")],

    settings: [],
    getData(portId, node, context) {
        const color = context.getInputValueColor(node, "color");
        const size = context.getInputValueNumber(node, "lineWidth");

        const points = context.getInputValue<Vector2[]>(node, "spline", "array-vector2")
        return () => {
            context.target.noFill();
            context.target.stroke(toP5Color(color, context.p5));
            context.target.strokeWeight(size);
            context.target.beginShape();
            for (let i = 0; i < points.length - 3; i += 4) {
                const start = points[i + 0];
                const p1 = points[i + 1];
                const p2 = points[i + 2];
                const end = points[i + 3];
                context.target.vertex(...start)
                context.target.bezierVertex(...p1, ...p2, ...end);
            }
            context.target.endShape()
        };
    },
};
