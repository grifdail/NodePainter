import { IconTopologyFull } from "@tabler/icons-react";
import { CylinderGeometry } from "three";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { readFromCacheWithVersion } from "../../../Utils/graph/execution/blackboardCache";

export const CylinderGeometryNode: NodeDefinition = {
    id: "3D/Geometry/CylinderGeometry",
    label: " Cylinder Geometry",
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
            defaultValue: 6,
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
            id: "ratio",
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
        const ratio = context.getInputValueNumber(node, "ratio");
        const geo = readFromCacheWithVersion(context, node, () => {
            const tr = 1 / Math.max(ratio, 1 - ratio);
            const self = new CylinderGeometry(ratio * tr, (1 - ratio) * tr, 1, side);
            return self;
        }, `${side} ${ratio}`)
        return geo;
    },
};
