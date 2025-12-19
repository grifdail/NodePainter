import { IconLine } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { PortTypeDefinitions, portTypesWithTags } from "../../../Types/PortTypeDefinitions";
import { Port } from "../../../Types/PortTypeGenerator";
import { createVector2 } from "../../../Types/vectorDataType";
import { changeTypeGenerator } from "../../../Utils/graph/definition/changeTypeGenerator";
import { vectorClosestPoint } from "../../../Utils/math/vectorUtils";

export const ClosestPointOnLineNode: NodeDefinition = {
    id: "Math/Geometry/ClosestPointOnLine",
    alias: "Closest Point On Line",
    description: "Find the closest point to a point on a lign",
    icon: IconLine,
    featureLevel: 50,
    tags: ["Math"],
    dataInputs: [
        Port.vector2("start", createVector2(0, 0)),
        Port.vector2("end", createVector2(400, 400)),
        Port.vector2("target", createVector2(400, 0)),
        Port.bool("bound", true, "If this is set, this will the point will be limited to the segment"),

    ],
    dataOutputs: [
        Port.vector2("point"),
    ],
    settings: [],
    codeBlockType: "expression",
    ...changeTypeGenerator(portTypesWithTags(["common", "true-vector"], ["array"]), ["start", "end", "target"], ["point"]),
    getData: (portId, nodeData, context) => {
        const start = context.getInputValueVector(nodeData, "start");
        const end = context.getInputValueVector(nodeData, "end");
        const target = context.getInputValueVector(nodeData, "target");
        const bound = context.getInputValueBoolean(nodeData, "bound");
        var result = ClosestPointOnLineNode.fn?.(start, end, target, bound) || PortTypeDefinitions[nodeData.dataOutputs.distance.type].createDefaultValue();;

        return result;

    },
    fn: vectorClosestPoint,
};
