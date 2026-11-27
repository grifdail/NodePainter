import { IconTopologyFull } from "@tabler/icons-react";
import { PlaneGeometry } from "three";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { readFromCacheWithVersion } from "../../../Utils/graph/execution/blackboardCache";

export const PlaneGeometryNode: NodeDefinition = {
    id: "3D/Geometry/PlaneGeometry",
    label: " Plane Geometry",
    description: "The geometry for a regular polyhedron with 20 vertice and 12 face",
    icon: IconTopologyFull,
    tags: [
        "3D",
        "Mesh"
    ],
    dataInputs: [
        {
            id: "detail",
            type: "vector2",
            defaultValue: [
                0,
                0
            ],
            constrains: [
                {
                    id: "VecInteger",
                    params: []
                },
                {
                    id: "VecPositive",
                    params: []
                }
            ]
        },

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
        const detail = context.getInputValueVector2(node, "detail");
        const geo = readFromCacheWithVersion(context, node, () => {
            const self = new PlaneGeometry(1, 1, Math.floor(detail[0]), Math.floor(detail[1]));
            return self;
        }, `${Math.floor(detail[0])} - ${Math.floor(detail[1])}`)
        return geo;
    },
};
