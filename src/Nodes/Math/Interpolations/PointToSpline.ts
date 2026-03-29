import { IconTrendingDown3 } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { Vector2 } from "../../../Types/vectorDataType";
import { vectorAddition, vectorScale, vectorSubstraction } from "../../../Utils/math/vectorUtils";

export const PointsToSplineNode: NodeDefinition = {
    id: "Math/Interpolation/PointToSpline",
    tags: ["Math"],
    icon: IconTrendingDown3,
    description: "Transform a serie of point into a smoothly interpolating spline",
    featureLevel: 10,
    dataInputs: [
        Port["array-vector2"]("points", []),
        Port.bool("loop"),
        Port.number("strenght", 0.5),
    ],
    dataOutputs: [
        Port["array-vector2"]("spline")
    ],

    settings: [

    ],
    getData: (portId, node, context) => {
        const points = context.getInputValue<Vector2[]>(node, "points", "array-vector2");
        const loop = context.getInputValueBoolean(node, "loop");
        const strenght = context.getInputValueNumber(node, "strenght");

        const result: Vector2[] = []
        var count = points.length
        if (count < 2) {
            return []
        }
        if (count == 2) {
            return [points[0], points[0], points[1], points[1]]
        }

        for (let i = 0; i < count; i++) {
            const element = points[i];
            const prev = i > 0 ? points[i - 1] : (loop ? points[count - 1] : element);
            const next = i < count - 1 ? points[i + 1] : (loop ? points[0] : element);

            var dir = vectorSubstraction(next, prev);
            //var projected = vectorProject(vectorSubstraction(element, prev), dir);
            //var cp1 = vectorAddition(element, vectorScale(vectorSubstraction(prev, projected), strenght));
            var cp1 = vectorAddition(element, vectorScale(dir, -strenght));
            //var cp2 = vectorAddition(element, vectorScale(vectorSubstraction(next, projected), strenght));
            var cp2 = vectorAddition(element, vectorScale(dir, strenght));
            result.push([...cp1])
            result.push([...element])

            result.push([...element]);
            result.push([...cp2])

        }
        if (loop) {
            return [...result.slice(2), result[0], result[1]]
        }

        return result.slice(2, result.length - 2);
    },
};
