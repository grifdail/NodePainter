import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { createVector2, createVector3, Vector2, Vector3 } from "../../../Types/vectorDataType";
import { changeTypeGenerator } from "../../../Utils/graph/definition/changeTypeGenerator";
import { vectorCrossProduct, vectorDotProduct, vectorLerp, vectorMagnitude, vectorNormalize, vectorScale, vectorSlice } from "../../../Utils/math/vectorUtils";

export const SLerpNode: NodeDefinition = {
    id: "Math/Interpolation/SLerp",
    alias: "Mix",
    description: "interpolate between 2 vector using spherical interpolation",
    icon: IconMathFunction,
    featureLevel: 50,
    tags: ["Math", "Vector"],
    dataInputs: [
        {
            id: "from",
            type: "vector2",
            defaultValue: createVector2(),
        },
        {
            id: "to",
            type: "vector2",
            defaultValue: createVector2(),
        },
        {
            id: "t",
            type: "number",
            defaultValue: 0.5,
        },
    ],
    dataOutputs: [
        {
            id: "result",
            type: "vector2",
            defaultValue: createVector2(),
        },
    ],

    codeBlockType: "expression",
    settings: [],
    ...changeTypeGenerator(["vector3", "vector2"], ["from", "to"], ["result"]),
    getData: (portId, node, context) => {
        const t = context.getInputValueNumber(node, "t");
        if (node.selectedType === "vector3") {
            const a = context.getInputValueVector3(node, "from");
            const b = context.getInputValueVector3(node, "to");
            return slerp(a, b, t)
        } else {
            const a = context.getInputValueVector2(node, "from");
            const b = context.getInputValueVector2(node, "to");
            return slerp(a, b, t)
        }
    }
};

export function slerp<T extends Vector2 | Vector3>(a: T, b: T, t: number): T {

    // calculate magnitudes
    const aMag = vectorMagnitude(a);
    const bMag = vectorMagnitude(b);
    const magmag = aMag * bMag;
    // if either is a zero vector, linearly interpolate by these vectors
    if (magmag === 0) {
        return vectorLerp(a, b, t);
    }
    const a3 = createVector3(...a)
    const b3 = createVector3(...a)
    // the cross product of 'this' and 'v' is the axis of rotation
    let axis = vectorCrossProduct(a3, b3);
    const axisMag = vectorMagnitude(axis)
    // Calculates the angle between 'this' and 'v'
    const theta = Math.atan2(axisMag, vectorDotProduct(a, b));

    // However, if the norm of axis is 0, normalization cannot be performed,
    // so we will divide the cases
    if (axisMag > 0) {
        axis = vectorScale(axis, 1 / axisMag)
    } else if (theta < Math.PI * 0.5) {
        // if the norm is 0 and the angle is less than PI/2,
        // the angle is very close to 0, so do linear interpolation.
        return vectorLerp(a, b, t);
    } else {
        // If the norm is 0 and the angle is more than PI/2, the angle is
        // very close to PI.
        // In this case v can be regarded as '-this', so take any vector
        // that is orthogonal to 'this' and use that as the axis.
        if (a3[2] === 0 && b3[0] === 0) {
            // if both this and v are 2D vectors, use (0,0,1)
            // this makes the result also a 2D vector.
            axis = createVector3(0, 0, 1)
        } else if (a3[0] !== 0) {
            // if the x components is not 0, use (y, -x, 0)
            axis = vectorNormalize(createVector3(a[0], -a[1], 0));
        } else {
            // if the x components is 0, use (1,0,0)
            axis = createVector3(1, 0, 0);
        }
    }

    // Since 'axis' is a unit vector, ey is a vector of the same length as 'this'.
    const ey = vectorCrossProduct(axis, a3);
    // interpolate the length with 'this' and 'v'.
    const lerpedMagFactor = (1 - t) + t * bMag / aMag;
    // imagine a situation where 'axis', 'this', and 'ey' are pointing
    // along the z, x, and y axes, respectively.
    // rotates 'this' around 'axis' by amt * theta towards 'ey'.
    const cosMultiplier = lerpedMagFactor * Math.cos(t * theta);
    const sinMultiplier = lerpedMagFactor * Math.sin(t * theta);
    // then, calculate 'result'.
    const result = createVector3(
        a3[0] * cosMultiplier + ey[0] * sinMultiplier,
        a3[1] * cosMultiplier + ey[1] * sinMultiplier,
        a3[2] * cosMultiplier + ey[2] * sinMultiplier
    );
    if (a.length === 3) {
        return result as T;
    } else {
        return vectorSlice(result, 2) as T;
    }
}