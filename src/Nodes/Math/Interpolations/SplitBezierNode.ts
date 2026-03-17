import { IconVectorBezier2 } from "@tabler/icons-react";
import { Vector2 } from "@use-gesture/react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { createVector2 } from "../../../Types/vectorDataType";
import { vectorLerp } from "../../../Utils/math/vectorUtils";

export const SplitBezierNode: NodeDefinition = {
    id: "Math/Interpolation/SplitBezier",
    description: "Given a Cubic Bezier curve and an interpolation point return control point that draw 2 bezier curve that match the original",
    icon: IconVectorBezier2,
    tags: ["Math"],
    dataInputs: [
        {
            id: "t",
            type: "number",
            defaultValue: 10,
        },
        {
            id: "start",
            type: "vector2",
            defaultValue: createVector2(100, 200),
        },
        {
            id: "cp1",
            type: "vector2",
            defaultValue: createVector2(200, 100),
        },
        {
            id: "cp2",
            type: "vector2",
            defaultValue: createVector2(200, 300),
        },
        {
            id: "end",
            type: "vector2",
            defaultValue: createVector2(300, 200),
        },
    ],
    dataOutputs: [
        { id: "point", type: "vector2", defaultValue: createVector2() },
        { id: "cp1out", label: "cp1", type: "vector2", defaultValue: createVector2() },
        { id: "cp2out", label: "cp2", type: "vector2", defaultValue: createVector2() },
        { id: "cp3out", label: "cp3", type: "vector2", defaultValue: createVector2() },
        { id: "cp4out", label: "cp4", type: "vector2", defaultValue: createVector2() },
    ],

    codeBlockType: "expression",
    settings: [],

    getData: (portId, data, context) => {
        var t = context.getInputValueNumber(data, "t");
        var start = context.getInputValueVector2(data, "start");
        var cp1 = context.getInputValueVector2(data, "cp1");
        var cp2 = context.getInputValueVector2(data, "cp2");
        var end = context.getInputValueVector2(data, "end");
        const { ppp, p1, pp1, pp2, p3 } = QuadraticBezierPoints(start, cp1, t, cp2, end);
        if (portId === "point") {
            return ppp;
        }
        if (portId === "cp1out") {
            return p1;
        }
        if (portId === "cp2out") {
            return pp1;
        }
        if (portId === "cp3out") {
            return pp2;
        }
        if (portId === "cp4out") {
            return p3;
        }

    },
};
export function QuadraticBezierPoints(start: Vector2, cp1: Vector2, t: number, cp2: Vector2, end: Vector2) {
    const p1 = vectorLerp(start, cp1, t);
    const p2 = vectorLerp(cp1, cp2, t);
    const p3 = vectorLerp(cp2, end, t);
    const pp1 = vectorLerp(p1, p2, t);
    const pp2 = vectorLerp(p2, p3, t);
    const ppp = vectorLerp(pp1, pp2, t);
    return { ppp, p1, pp1, pp2, p3 };
}

