import { IconVectorBezier2 } from "@tabler/icons-react";
import { inverseLerp } from "three/src/math/MathUtils";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { createVector2 } from "../../../Types/vectorDataType";
import { QuadraticBezierPoints } from "./SplitBezierNode";

export const BezierSubsetNode: NodeDefinition = {
    id: "Math/Interpolation/BezierSubset",
    description: "Return the control points for a subset of the Cubic Bezier Curve",
    icon: IconVectorBezier2,
    tags: ["Math"],
    dataInputs: [
        {
            id: "tStart",
            type: "number",
            defaultValue: 10,
        },
        {
            id: "tEnd",
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
        { id: "startOut", label: "start", type: "vector2", defaultValue: createVector2() },
        { id: "cp1out", label: "cp1", type: "vector2", defaultValue: createVector2() },
        { id: "cp2out", label: "cp2", type: "vector2", defaultValue: createVector2() },
        { id: "endOut", label: "end", type: "vector2", defaultValue: createVector2() },

    ],

    codeBlockType: "expression",
    settings: [],

    getData: (portId, data, context) => {
        var tStart = context.getInputValueNumber(data, "tStart");
        var tEnd = context.getInputValueNumber(data, "tEnd");
        var start = context.getInputValueVector2(data, "start");
        var cp1 = context.getInputValueVector2(data, "cp1");
        var cp2 = context.getInputValueVector2(data, "cp2");
        var end = context.getInputValueVector2(data, "end");
        const { ppp: startOut, pp2: halfCurveCP1, p3: halfCurveCP2 } = QuadraticBezierPoints(start, cp1, tStart, cp2, end);
        const { ppp: endOut, p1, pp1 } = QuadraticBezierPoints(startOut, halfCurveCP1, inverseLerp(tStart, 1, tEnd), halfCurveCP2, end);
        if (portId === "startOut") {
            return startOut;
        }
        if (portId === "cp1out") {
            return p1;
        }
        if (portId === "cp2out") {
            return pp1;
        }
        if (portId === "endOut") {
            return endOut;
        }

    },
};


