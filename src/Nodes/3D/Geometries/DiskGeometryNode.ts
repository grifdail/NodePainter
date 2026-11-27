import { IconTopologyFull } from "@tabler/icons-react";
import { RingGeometry } from "three";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { readFromCacheWithVersion } from "../../../Utils/graph/execution/blackboardCache";

export const DiskGeometryNode: NodeDefinition = {
    id: "3D/Geometry/DiskGeometry",
    label: " Disk Geometry",
    description: "The geometry for a cylinder",
    icon: IconTopologyFull,
    tags: [
        "3D",
        "Mesh"
    ],
    dataInputs: [
        {
            id: "side",
            type: "number",
            defaultValue: 32,
            constrains: [
                {
                    id: "Integer",
                    params: []
                },
                {
                    id: "GreaterThan",
                    params: [
                        3
                    ]
                }
            ]
        },
        {
            id: "hole",
            type: "number",
            defaultValue: 0.5,
            constrains: [
                {
                    id: "Clamp01",
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
        const side = context.getInputValueNumber(node, "side");
        const hole = context.getInputValueNumber(node, "hole");
        const geo = readFromCacheWithVersion(context, node, () => {
            const self = new RingGeometry(hole, 1, side, 1);
            return self;
        }, `${Math.floor(side)}-${Math.floor(hole * 1000)}`)
        return geo;
    },
};
