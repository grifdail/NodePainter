import { IconLine } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { portTypesWithTags } from "../../../Types/PortTypeDefinitions";
import { Port } from "../../../Types/PortTypeGenerator";
import { createVector2, Vector } from "../../../Types/vectorDataType";
import { changeTypeGenerator } from "../../../Utils/graph/definition/changeTypeGenerator";
import { vectorClosestPoint, vectorDistance } from "../../../Utils/math/vectorUtils";

export const DistanceToLineNode: NodeDefinition = {
    id: "Math/Geometry/DistanceToLine",
    alias: "Distance to Line",
    description: "Find the distance between the line and the target point",
    icon: IconLine,
    featureLevel: 50,
    tags: ["Math"],
    dataInputs: [
        Port.vector2("start", createVector2(0, 0)),
        Port.vector2("end", createVector2(400, 400)),
        Port.vector2("target", createVector2(400, 0)),
        Port.bool("bound", true, "If this is set, this will the distance will be limited to the segment."),

    ],
    dataOutputs: [
        Port.number("distance"),
    ],
    settings: [],
    codeBlockType: "expression",
    ...changeTypeGenerator(portTypesWithTags(["common", "true-vector"], ["array"]), ["start", "end", "target"], []),
    getData: (portId, node, context) => {
        const start = context.getInputValueVector(node, "start");
        const end = context.getInputValueVector(node, "end");
        const target = context.getInputValueVector(node, "target");
        const bound = context.getInputValueBoolean(node, "bound");
        var result = DistanceToLineNode.fn?.(start, end, target, bound) || 0;
        return result;

    },
    fn: <T extends Vector>(start: T, end: T, target: T, bound: boolean) => {
        var a = vectorClosestPoint(start, end, target, bound);
        return vectorDistance(a, target);
    },
};
