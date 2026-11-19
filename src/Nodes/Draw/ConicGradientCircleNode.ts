import { IconColorFilter, IconRectangle } from "@tabler/icons-react";
import { DoubleIconGen } from "../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createDefaultGradient, createVector2 } from "../../Types/vectorDataType";
import { toHex } from "../../Utils/math/colorUtils";

export const ConicGradientCircleNode: NodeDefinition = {
    id: "Draw/ConicGradientCircle",
    description: "Draw a circle filled with a conic gradient",
    icon: DoubleIconGen(IconRectangle, IconColorFilter),
    tags: ["Drawing"],
    dataInputs: [
        {
            id: "gradient",
            type: "gradient",
            defaultValue: createDefaultGradient(),
        },
        {
            id: "radius",
            type: "number",
            defaultValue: 0,
        }, {
            id: "angle",
            type: "number",
            defaultValue: 0,
        },
        {
            id: "center",
            type: "vector2",
            defaultValue: createVector2(10, 10),
        }
    ],
    dataOutputs: [Port.drawing2d("out")],

    settings: [],
    getData(portId, node, context) {
        var gradient = context.getInputValueGradient(node, "gradient");
        var radius = context.getInputValueNumber(node, "radius");
        var angle = context.getInputValueNumber(node, "angle");
        var center = context.getInputValueVector(node, "center");
        return () => {
            context.target.noFill();
            context.target.noStroke();
            const ctx = context.target.drawingContext as CanvasRenderingContext2D;

            var ctxGrad = ctx.createConicGradient(angle, center[0], center[1]);
            gradient.forEach((stop) => {
                ctxGrad.addColorStop(stop.pos, toHex(stop.color));
            });

            ctx.fillStyle = ctxGrad;
            ctx.beginPath();
            ctx.arc(center[0], center[1], radius, 0, Math.PI * 2)
            ctx.closePath();
            ctx.fill();
        };
    },
};
