import { IconMathXPlusY } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { createVector2, Vector2 } from "../../../Types/vectorDataType";
import { vectorAddition, vectorComponentSquareRoot, vectorLimitMagnitude, vectorMax, vectorScale, vectorSubstraction } from "../../../Utils/math/vectorUtils";

export const DiskToSquareNode: NodeDefinition = {
    id: "Math/Vector/DiskToSquare",
    description: "Given a position within unit circle, remaps it to the unit square in the range -1, 1",
    icon: IconMathXPlusY,
    featureLevel: 90,
    tags: ["Math", "Vector"],
    dataInputs: [
        {
            id: "pos",
            type: "vector2",
            defaultValue: createVector2(),
        },
    ],
    dataOutputs: [
        {
            id: "out",
            type: "number",
            defaultValue: 0,
        },
    ],

    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {
        const pos = context.getInputValueVector(node, "pos");
        const c = vectorLimitMagnitude(pos, 1)
        const u2 = c[0] * c[0];
        const v2 = c[1] * c[1];
        const n: Vector2 = [1, -1];
        const p = vectorAddition(createVector2(2, 2), vectorScale(n, u2 - v2));
        const q = vectorScale(c, 2 * Math.SQRT2);
        const smolVec: Vector2 = [0.0001, 0.0001];
        return vectorScale(
            vectorSubstraction(
                vectorComponentSquareRoot(vectorMax(smolVec, vectorAddition(p, q))),
                vectorComponentSquareRoot(vectorMax(smolVec, vectorSubstraction(p, q)))
            )
            , 0.5);
    },
};
