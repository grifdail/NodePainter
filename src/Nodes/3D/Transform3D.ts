import { IconBadge3d } from "@tabler/icons-react";
import { Object3D } from "three";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createVector3 } from "../../Types/vectorDataType";
import { readFromCacheWithVersion } from "../../Utils/graph/execution/blackboardCache";

export const Transform3D: NodeDefinition = {
    id: "3D/Transform",
    label: "Transform 3D",
    description: "Transform a 3d model",
    icon: IconBadge3d,
    tags: ["3D"],
    dataInputs: [
        Port.object3d("object"),
        {
            id: "position",
            type: "vector3",
            defaultValue: createVector3(0, 0, 0),
        },
        {
            id: "dimension",
            type: "vector3",
            defaultValue: createVector3(1, 1, 1),
        },
        {
            id: "rotation",
            type: "quaternion",
            defaultValue: [0, 0, 0, 1],
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
        var mesh = context.getInputValue(node, "object", "object3d") as any;
        var rotation = context.getInputValueQuaternion(node, "rotation");
        var position = context.getInputValueVector3(node, "position");
        var dimension = context.getInputValueVector3(node, "dimension");
        const element = readFromCacheWithVersion(context, node, () => {
            const self = new Object3D();
            return self;
        })
        if (element.children[0] !== mesh) {
            if (element.children[0]) {
                element.remove(element.children[0]);
            }
            if (mesh) {
                element.add(mesh);
            }
        }
        element.position.set(...position);
        element.quaternion.set(...rotation);
        element.scale.set(...dimension);
        return element;
    },
};
