import { IconTopologyFull } from "@tabler/icons-react";
import { BoxGeometry } from "three";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { readFromCacheWithVersion } from "../../../Utils/graph/execution/blackboardCache";

export const BoxGeometryNode: NodeDefinition = {
    id: "3D/Geometry/BoxGeometry",
    label: " Box Geometry",
    description: "The geometry for a simple box",
    icon: IconTopologyFull,
    tags: [
        "3D",
        "Mesh"
    ],
    dataInputs: [
        Port.CacheId(),
        Port.Version(),
    ],
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
            return new BoxGeometry(1, 1, 1)
        })
        return geo;
    },
};




