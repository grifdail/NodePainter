import { IconLine } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createColor, createVector2, Vector2 } from "../../Types/vectorDataType";
import { toP5Color } from "../../Utils/math/colorUtils";
import { vector2Perpendicular, vectorAddition, vectorNormalize, vectorSubstraction } from "../../Utils/math/vectorUtils";

export const VariableWidthPolylineNode: NodeDefinition = {
    id: "Draw/VariableWidthPolyline",
    label: "Draw Polyline with a variable line",
    description: "Draw a line made of multiple point with a different width at each point",
    icon: IconLine,
    tags: ["Drawing"],
    dataInputs: [
        {
            id: "color",
            type: "color",
            defaultValue: createColor(0, 0, 0),
        },
        {
            id: "points",
            type: "array-vector2",
            defaultValue: [createVector2(25, 0), createVector2(0, 0), createVector2(0, 25)],
        },
        {
            id: "weight",
            type: "array-number",
            defaultValue: [createVector2(25, 0), createVector2(0, 0), createVector2(0, 25)],
        },
    ],
    dataOutputs: [Port.drawing2d("out")],

    settings: [],
    getData(portId, node, context) {
        const color = context.getInputValueColor(node, "color");
        const points = context.getInputValueVectorArray(node, "points") as Vector2[];
        let weight = context.getInputValue(node, "weight", "array-number") as number[];
        if (weight.length < 2) {
            weight = points.map((a, i) => 1 - i / weight.length)
        }
        if (points.length < 2) {
            return () => { };
        }
        const addNext: Vector2[] = []
        const addFirst: Vector2[] = []
        for (let i = 0; i < points.length; i++) {
            const p = points[i];
            const w = weight[i % weight.length]
            var pref: Vector2 = i !== 0 ? points[i - 1] : vectorAddition<Vector2>(vectorSubstraction<Vector2>(points[i], points[i + 1]), points[i])
            var next: Vector2 = i !== points.length - 1 ? points[i + 1] : vectorAddition<Vector2>(vectorSubstraction<Vector2>(points[i], points[i - 1]), points[i])
            var tangent = vectorNormalize<Vector2>(vectorSubstraction(next, pref));
            var c = vector2Perpendicular(tangent);
            addNext.push([p[0] - c[0] * w, p[1] - c[1] * w])
            addFirst.push([p[0] + c[0] * w, p[1] + c[1] * w]);
        }
        return () => {

            context.target.fill(toP5Color(color, context.p5));
            context.target.noStroke()
            context.target.beginShape();

            addFirst.forEach(a => context.target.vertex(a[0], a[1]))
            addNext.toReversed().forEach(a => context.target.vertex(a[0], a[1]))

            context.target.endShape();
            context.target.noFill();
            context.target.noStroke();
        };
    },
};
