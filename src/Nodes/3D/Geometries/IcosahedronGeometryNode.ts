import { IconTopologyFull } from "@tabler/icons-react";
import { IcosahedronGeometry } from "three";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { readFromCacheWithVersion } from "../../../Utils/graph/execution/blackboardCache";

export const IcosahedronGeometryNode: NodeDefinition = {
    id: "3D/Geometry/IcosahedronGeometry",
    label: " Icosahedron Geometry",
    icon: IconTopologyFull,
    description: "The geometry for a regular polyhedron with 12 vertice and 20 face",
    tags: [
        "3D",
        "Mesh"
    ],
    dataInputs: [
        {
            id: "detail",
            type: "number",
            defaultValue: 0,
            constrains: [
                {
                    id: "Integer",
                    params: []
                },
                {
                    id: "Positive",
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
        const detail = context.getInputValueNumber(node, "detail");
        const geo = readFromCacheWithVersion(context, node, () => {
            const self = new IcosahedronGeometry(1, Math.floor(detail));
            return self;
        }, `${Math.floor(detail)}`)
        return geo;
    },
};
