import { IconTopologyFull } from "@tabler/icons-react";
import { DodecahedronGeometry } from "three";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { readFromCacheWithVersion } from "../../../Utils/graph/execution/blackboardCache";

export const DodecahedronGeometryNode: NodeDefinition = {
    id: "3D/Geometry/DodecahedronGeometry",
    label: " Dodecahedron Geometry",
    description: "The geometry for a regular polyhedron with 20 vertice and 12 face",
    icon: IconTopologyFull,
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
            const self = new DodecahedronGeometry(1, Math.floor(detail));
            return self;
        }, `${Math.floor(detail)}`)
        return geo;
    },
};
