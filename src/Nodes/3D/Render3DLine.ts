import { IconBadge3d } from "@tabler/icons-react";
import { CylinderGeometry, Material, Mesh, Vector3 } from "three";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createDefaultMaterial } from "../../Utils/graph/definition/createDefaultMaterial";
import { readFromCacheWithVersion } from "../../Utils/graph/execution/blackboardCache";
import { vectorMagnitude, vectorNormalize, vectorSubstraction } from "../../Utils/math/vectorUtils";


export const Render3DLine: NodeDefinition = {
    id: "3D/Model/Line",
    label: "Render 3D Line",
    description: "Render a line in 3D",
    icon: IconBadge3d,
    tags: ["3D"],
    dataInputs: [
        Port.vector3("start"),
        Port.vector3("end"),
        Port.number("size", 0.2),
        {
            id: "material",
            type: "material",
            defaultValue: createDefaultMaterial(),
        },
        Port.CacheId(),
    ],
    dataOutputs: [
        {
            id: "object",
            type: "object3d",
            defaultValue: null,
        },
    ],

    settings: [],
    getData(portId, node, context) {
        var material = context.getInputValueMaterial(node, "material");
        var start = context.getInputValueVector3(node, "start");
        var end = context.getInputValueVector3(node, "end");
        var size = context.getInputValueNumber(node, "size");
        const element = readFromCacheWithVersion(context, node, () => {
            const self = new Mesh(new CylinderGeometry(1, 1, 1, 32, 1, false), material as Material);
            return self;
        })
        var dt = vectorSubstraction(end, start);
        element.position.set((start[0] + end[0]) * 0.5, (start[1] + end[1]) * 0.5, (start[2] + end[2]) * 0.5);
        element.quaternion.setFromUnitVectors(new Vector3(0, 1, 0), new Vector3(...vectorNormalize(dt)));
        element.scale.set(size * 0.5, vectorMagnitude(dt), size * 0.5);
        if (material !== element.material) {
            element.material = material as Material;
            console.log("If you see a lot of this, something's wrong with the caching!");
        }
        return element;
    },
};
