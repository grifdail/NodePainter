import { IconTopologyFull } from "@tabler/icons-react";
import { ConeGeometry } from "three";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { readFromCacheWithVersion } from "../../../Utils/graph/execution/blackboardCache";

export const ConeGeometryNode: NodeDefinition = {
    id: "3D/Geometry/ConeGeometry",
    label: " Cone Geometry",
    description: "The geometry for a Cone",
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
            const self = new ConeGeometry(1, 1, 24);
            return self;
        })
        return geo;
    },
};
