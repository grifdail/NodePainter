import { IconTopologyFull } from "@tabler/icons-react";
import { PlaneGeometry } from "three";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { readFromCacheWithVersion } from "../../../Utils/graph/execution/blackboardCache";

export const QuadGeometryNode: NodeDefinition = {
    id: "3D/Geometry/QuadGeometry",
    label: " Quad Geometry",
    description: "The geometry for a regular simple 2d quad",
    icon: IconTopologyFull,
    tags: [
        "3D",
        "Mesh"
    ],
    dataInputs: [
        Port.CacheId(),
        Port.Version(),],
    dataOutputs: [
        {
            id: "output",
            type: "mesh",
            defaultValue: null
        }
    ],
    settings: [],
    getData(portId, node, context) {

        const geo = readFromCacheWithVersion(context, node, () => {
            const self = new PlaneGeometry(1, 1);
            return self;
        })
        return geo;
    },
};
