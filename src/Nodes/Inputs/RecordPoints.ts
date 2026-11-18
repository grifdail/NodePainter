import { IconRoute } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { Vector2 } from "../../Types/vectorDataType";
import { vectorMultiplication, vectorSubstraction } from "../../Utils/math/vectorUtils";

enum PointsOrigin {
    center,
    topLeft,
}

export const RecordPoints: NodeDefinition = {
    id: "Input/RecordPoints",
    label: "Record Points",
    description: "Replay a handdrawn bezier path",
    icon: IconRoute,
    tags: ["Input"],
    dataInputs: [Port.vector2("scale", [400, 400])],
    dataOutputs: [Port["array-vector2"]("pos")],

    settings: [
        {
            type: "dropdown",
            id: "origin",
            defaultValue: "center",
            options: Object.keys(PointsOrigin)
        },
        {
            id: "path",
            type: "points",
        },
    ],
    getData: (portId, node, context) => {
        const points = node.settings["path"] as Vector2[];
        const scale = context.getInputValueVector2(node, "scale");
        const useOrigin = node.settings["origin"] === "origin";
        return points.map(a => useOrigin ? vectorMultiplication(vectorSubstraction(a, [0.5, 0.5]), scale) : vectorMultiplication(a, scale))
    },
};
