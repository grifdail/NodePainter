import { IconTopologyFull } from "@tabler/icons-react";
import { TorusGeometry } from "three";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { readFromCacheWithVersion } from "../../../Utils/graph/execution/blackboardCache";

export const TorusGeometryNode: NodeDefinition = {
    id: "3D/Geometry/TorusGeometry",
    label: " Torus Geometry",
    description: "The geometry for a torus",
    icon: IconTopologyFull,
    tags: [
        "3D",
        "Mesh"
    ],
    dataInputs: [
        {
            id: "radius",
            type: "number",
            defaultValue: 1,
            constrains: [
                {
                    id: "Positive",
                    params: []
                }
            ]
        },
        {
            id: "tubeRadius",
            type: "number",
            defaultValue: 0.25,
            constrains: [
                {
                    id: "Positive",
                    params: []
                }
            ]
        },
        {
            id: "radialSegment",
            type: "number",
            defaultValue: 16,
            constrains: [
                {
                    id: "Integer",
                    params: []
                },
                {
                    id: "GreaterThan",
                    params: [
                        2
                    ]
                }
            ]
        },
        {
            id: "tubeSegment",
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
        const radius = context.getInputValueNumber(node, "radius");
        const tubeRadius = context.getInputValueNumber(node, "tubeRadius");
        const radialSegment = context.getInputValueNumber(node, "radialSegment");
        const tubeSegment = context.getInputValueNumber(node, "tubeSegment");
        const geo = readFromCacheWithVersion(context, node, () => {
            const self = new TorusGeometry(radius, tubeRadius, radialSegment, tubeSegment);
            return self;
        }, `${radius} ${tubeRadius} ${radialSegment} ${tubeSegment}`)
        return geo;
    },
};
