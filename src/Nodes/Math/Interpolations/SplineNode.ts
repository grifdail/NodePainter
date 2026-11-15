import { IconRoute } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { interpolateSpline, interpolateSplineDir } from "../../../Types/PathData";
import { Port } from "../../../Types/PortTypeGenerator";
import { Vector2 } from "../../../Types/vectorDataType";
import { Constraints } from "../../../Utils/ui/applyConstraints";

export const SplineNode: NodeDefinition = {
    id: "Math/Interpolation/Spline",
    label: "Interpolate a Spline",
    description: "Replay a handdrawn bezier path",
    icon: IconRoute,
    tags: ["Input"],
    dataInputs: [
        Port["array-vector2"]("spline", 0, [Constraints.Clamp01()]),
        Port.number("pos", 0, [Constraints.Clamp01()]),
    ],
    dataOutputs: [Port.vector2("pos"), Port.vector2("dir")],

    settings: [

    ],
    getData: (portId, node, context) => {
        const path = context.getInputValue(node, "spline", "array-vector2") as Vector2[]
        const pos = context.getInputValueNumber(node, "pos");


        var pp = portId === "dir" ? interpolateSplineDir(path, pos) : interpolateSpline(path, pos);
        return [pp[0], pp[1]];
    },
};