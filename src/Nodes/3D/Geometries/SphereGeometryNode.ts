import { IconTopologyFull } from "@tabler/icons-react";
import { SphereGeometry } from "three";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { readFromCacheWithVersion } from "../../../Utils/graph/execution/blackboardCache";

export const SphereGeometryNode: NodeDefinition = {
    id: "3D/Geometry/SphereGeometry",
    label: " Sphere Geometry",
    description: "The geometry for a sphere",
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
                24,
                24
            ],
            constrains: [
                {
                    id: "VecInteger",
                    params: []
                },
                {
                    id: "VecGreaterThan",
                    params: [
                        3
                    ]
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
            const self = new SphereGeometry(1, Math.floor(detail[0]), Math.floor(detail[1]));
            return self;
        }, `${Math.floor(detail[0])} - ${Math.floor(detail[1])} `)
        return geo;
    },
};
