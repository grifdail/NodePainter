import { IconCube } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { Vector2 } from "../../Types/vectorDataType";
import { readFromCache } from "../../Utils/graph/execution/blackboardCache";
import { VirtualNodes } from "../3D/VirtualNodeTypes/VirtualNodeTypes";


export const ShapeGeometry: NodeDefinition = {
    id: "Shape Geometry",
    label: "Shape  Geometry",
    icon: IconCube,
    description: "Create a 3D geometric based on as polygon",
    featureLevel: 101,
    dataInputs: [
        Port["array-vector2"]("points", []),
        Port.number("extrude", 1),
        Port.bool("top", true),
        Port.bool("side", true),
        Port.bool("bottom", true),
        Port.CacheId()],
    dataOutputs: [Port.mesh("output")],
    tags: ["3D", "Mesh"],
    settings: [],
    getData(portId, node, context) {

        const positions = readFromCache(context, node, () => {
            const result = context.getInputValue(node, "points", "array-vector2") as Vector2[];
            return result;
        });

        var extrude = context.getInputValueNumber(node, "extrude");
        var side = context.getInputValueBoolean(node, "side");
        var top = context.getInputValueBoolean(node, "top");
        var bottom = context.getInputValueBoolean(node, "bottom");

        const callId = context.getCallId(node);
        return VirtualNodes.ShapeGeometryNodeType.generate(callId, [], positions, extrude, side, top, bottom);
    },
    contextMenu: {
    },
};
